package com.d102.common.service.impl;

import com.d102.common.constant.FileConstant;
import com.d102.common.constant.RedisConstant;
import com.d102.common.constant.TaskConstant;
import com.d102.common.domain.jpa.Analysis;
import com.d102.common.domain.jpa.Resume;
import com.d102.common.domain.jpa.ResumeQuestion;
import com.d102.common.domain.redis.QuestionListHash;
import com.d102.common.domain.redis.TempAnalysisHash;
import com.d102.common.exception.ExceptionType;
import com.d102.common.exception.custom.InvalidException;
import com.d102.common.repository.jpa.AnalysisRepository;
import com.d102.common.repository.jpa.ResumeQuestionRepository;
import com.d102.common.repository.jpa.ResumeRepository;
import com.d102.common.repository.redis.QuestionListHashRepository;
import com.d102.common.repository.redis.TempAnalysisHashRepository;
import com.d102.common.service.AsyncService;
import com.d102.common.util.FastAiApi;
import com.d102.common.util.OpenAiApi;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import lombok.RequiredArgsConstructor;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.rendering.ImageType;
import org.apache.pdfbox.rendering.PDFRenderer;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClientException;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@RequiredArgsConstructor
@Service
public class AsyncServiceImpl implements AsyncService {

    private final ResumeRepository resumeRepository;
    private final ResumeQuestionRepository resumeQuestionRepository;
    private final QuestionListHashRepository questionListHashRepository;
    private final TempAnalysisHashRepository tempAnalysisHashRepository;
    private final AnalysisRepository analysisRepository;
    private final OpenAiApi openAiApi;
    private final FastAiApi fastAiApi;

    @Async
    public void generateAndSaveQuestionList(Long resumeId) {
        Resume resume = resumeRepository.findById(resumeId).orElseThrow(() -> new InvalidException(ExceptionType.ResumeNotFoundException));
        processQuestionList(resumeId);
        saveResumeWithException(resume, TaskConstant.STATUS_PROCESS);

        String savePath = resume.getFilePath();
        /**
         * 1. savePath에서 pdf 파일을 읽어내서 이미지로 변환하고 imagePathList를 생성
         * 2. imagePathList에서 List<byte[]>로 변환
         * 3. 변환한 List<byte[]>를 OpenAiApi에 전달하여 질문 생성
         */
        List<byte[]> imageList = convertPdfToImage(savePath);
        OpenAiApi.Response response = null;
        List<String> questionList = null;

        try {
            resume.setAnalysisReqTime(LocalDateTime.now());
            resumeRepository.saveAndFlush(resume);
            response = openAiApi.generateQuestionList(imageList);

            String jsonString = response.getChoices().getFirst().getMessage().getContent();
            JsonObject jsonObject = JsonParser.parseString(jsonString).getAsJsonObject();
            questionList = jsonObject.entrySet().stream().map(entry -> entry.getValue().getAsString()).toList();
        } catch (RestClientException e) {
            saveResumeWithException(resume, TaskConstant.STATUS_FAIL);
            failQuestionList(resumeId);
            throw new InvalidException(ExceptionType.OpenAiApiException);
        } catch (IOException e) {
            saveResumeWithException(resume, TaskConstant.STATUS_FAIL);
            failQuestionList(resumeId);
            throw new InvalidException(ExceptionType.Base64ConvertException);
        } catch (Exception e) {
            saveResumeWithException(resume, TaskConstant.STATUS_FAIL);
            failQuestionList(resumeId);
            throw new InvalidException(ExceptionType.UnknownException);
        }

        resume.setAnalysisEndTime(LocalDateTime.now());
        saveResumeWithException(resume, TaskConstant.STATUS_SUCCESS);

        /**
         * 4. Resume에 대한 questionList에 들어있는 ResumeQuestion을 저장
         */
        List<ResumeQuestion> resumeQuestionList = questionList.stream()
                .map(question -> ResumeQuestion.builder().question(question).resume(resume).build())
                .toList();
        resumeQuestionRepository.saveAllAndFlush(resumeQuestionList);

        successQuestionList(resumeId);
    }

    private void saveResumeWithException(Resume resume, String status) {
        resume.setAnalysisStatus(status);
        resumeRepository.saveAndFlush(resume);
    }

    @Async
    public void analyzeVideo(Long analysisId) {
        Analysis analysis = analysisRepository.findById(analysisId).orElseThrow(() -> new InvalidException(ExceptionType.AnalysisNotFoundException));
        /* processAnalysis(analysisId); */
        /* saveVideoWithException(analysis, TaskConstant.STATUS_PROCESS); */

        FastAiApi.Response response = null;

        try {
            analysis.setAnalysisReqTime(LocalDateTime.now());
            analysisRepository.saveAndFlush(analysis);
            response = fastAiApi.analyzeVideo(analysisId);
        } catch (RestClientException e1) {
            /**
             * FastAI 서버로부터 실패한 응답을 받았을 경우 재시도
             */
            try {
                response = fastAiApi.analyzeVideo(analysisId);
            } catch (RestClientException e) {
                /* failAnalysis(analysisId); */
                /* analysis = analysisRepository.findById(analysisId).orElseThrow(() -> new InvalidException(ExceptionType.AnalysisNotFoundException)); */
                /* saveVideoWithException(analysis, TaskConstant.STATUS_FAIL); */
                throw new InvalidException(ExceptionType.FastAiApiException);
            } catch (Exception e) {
                /* analysis = analysisRepository.findById(analysisId).orElseThrow(() -> new InvalidException(ExceptionType.AnalysisNotFoundException)); */
                /* saveVideoWithException(analysis, TaskConstant.STATUS_FAIL); */
                /* failAnalysis(analysisId); */
                throw new InvalidException(ExceptionType.UnknownException);
            }
        }

        /* analysis = analysisRepository.findById(analysisId).orElseThrow(() -> new InvalidException(ExceptionType.AnalysisNotFoundException)); */
        /* successAnalysis(analysisId); */
        /* saveVideoWithException(analysis, TaskConstant.STATUS_SUCCESS); */
    }

    private void saveVideoWithException(Analysis analysis, String status) {
        analysis.setAnalysisStatus(status);
        analysisRepository.saveAndFlush(analysis);
    }

    private void successAnalysis(Long analysisId) {
        TempAnalysisHash tempAnalysisHash = tempAnalysisHashRepository.findById(String.valueOf(analysisId)).orElseThrow(() -> new InvalidException(ExceptionType.TempAnalysisHashNotFoundException));
        tempAnalysisHash.setStatus(RedisConstant.STATUS_SUCCESS);
        tempAnalysisHashRepository.save(tempAnalysisHash);
    }

    private void failAnalysis(Long analysisId) {
        TempAnalysisHash tempAnalysisHash = tempAnalysisHashRepository.findById(String.valueOf(analysisId)).orElseThrow(() -> new InvalidException(ExceptionType.TempAnalysisHashNotFoundException));
        tempAnalysisHash.setStatus(RedisConstant.STATUS_FAIL);
        tempAnalysisHashRepository.save(tempAnalysisHash);
    }

    private void processAnalysis(Long analysisId) {
        tempAnalysisHashRepository.save(TempAnalysisHash.builder().id(String.valueOf(analysisId)).status(RedisConstant.STATUS_PROCESS).build());
    }

    private void successQuestionList(Long resumeId) {
        QuestionListHash questionListHash = questionListHashRepository.findById(String.valueOf(resumeId)).orElseThrow(() -> new InvalidException(ExceptionType.QuestionListHashNotFoundException));
        questionListHash.setStatus(RedisConstant.STATUS_SUCCESS);
        questionListHashRepository.save(questionListHash);
    }

    private void failQuestionList(Long resumeId) {
        QuestionListHash questionListHash = questionListHashRepository.findById(String.valueOf(resumeId)).orElseThrow(() -> new InvalidException(ExceptionType.QuestionListHashNotFoundException));
        questionListHash.setStatus(RedisConstant.STATUS_FAIL);
        questionListHashRepository.save(questionListHash);
    }

    private void processQuestionList(Long resumeId) {
        questionListHashRepository.save(QuestionListHash.builder().id(String.valueOf(resumeId)).status(RedisConstant.STATUS_PROCESS).build());
    }

    private List<byte[]> convertPdfToImage(String savePath) {
        try (PDDocument document = PDDocument.load(new File(savePath))) {
            PDFRenderer pdfRenderer = new PDFRenderer(document);
            List<byte[]> imageList = new ArrayList<>();

            for (int i = 0; i < document.getNumberOfPages(); i++) {
                BufferedImage imageObject = pdfRenderer.renderImageWithDPI(i, FileConstant.RESUME_RENDER_DPI, ImageType.RGB);
                ByteArrayOutputStream baos = new ByteArrayOutputStream();
                ImageIO.write(imageObject, FileConstant.RESUME_RENDER_EXTENSION, baos);
                byte[] imageBytes = baos.toByteArray();
                imageList.add(imageBytes);
            }

            return imageList;
        } catch (IOException e) {
            throw new InvalidException(ExceptionType.PdfConvertException);
        }
    }

}
