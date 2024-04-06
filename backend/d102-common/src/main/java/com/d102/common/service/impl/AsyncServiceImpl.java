package com.d102.common.service.impl;

import com.d102.common.constant.FileConstant;
import com.d102.common.constant.RedisConstant;
import com.d102.common.constant.ResumeConstant;
import com.d102.common.constant.TaskConstant;
import com.d102.common.domain.jpa.Analysis;
import com.d102.common.domain.jpa.Resume;
import com.d102.common.domain.jpa.ResumeQuestion;
import com.d102.common.domain.redis.QuestionListHash;
import com.d102.common.exception.ExceptionType;
import com.d102.common.exception.custom.InvalidException;
import com.d102.common.repository.jpa.AnalysisRepository;
import com.d102.common.repository.jpa.ResumeQuestionRepository;
import com.d102.common.repository.jpa.ResumeRepository;
import com.d102.common.repository.redis.QuestionListHashRepository;
import com.d102.common.repository.redis.TempAnalysisHashRepository;
import com.d102.common.response.Response;
import com.d102.common.service.AsyncService;
import com.d102.common.service.TaskService;
import com.d102.common.util.FastAiApi;
import com.d102.common.util.OpenAiApi;
import com.d102.common.util.ThreadHelper;
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
    private final TaskService taskService;

    @Async
    public void generateAndSaveQuestionList(Long resumeId) {
        Resume resume = resumeRepository.findById(resumeId).orElseThrow(() -> new InvalidException(ExceptionType.ResumeNotFoundException));
        processGenerateAndSaveQuestionList(resumeId);
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

        resume.setAnalysisReqTime(LocalDateTime.now());
        resumeRepository.saveAndFlush(resume);

        int retryCount = 0;
        boolean isRetry = true;
        while (isRetry && retryCount < TaskConstant.MAX_RETRY) {
            try {
                response = openAiApi.generateQuestionList(imageList);
                String jsonString = response.getChoices().getFirst().getMessage().getContent();
                JsonObject jsonObject = JsonParser.parseString(jsonString).getAsJsonObject();
                questionList = jsonObject.entrySet().stream().map(entry -> entry.getValue().getAsString()).toList();
                isRetry = false;
            } catch (RestClientException e) {
                retryCount++;
                if (retryCount >= TaskConstant.MAX_RETRY) {
                    failGenerateAndSaveQuestionList(resumeId);
                    handleGenerateAndSaveQuestion(resumeId, ExceptionType.OpenAiApiException);
                }
                ThreadHelper.sleep(TaskConstant.RETRY_INTERVAL);
            } catch (IOException e) {
                retryCount++;
                if (retryCount >= TaskConstant.MAX_RETRY) {
                    failGenerateAndSaveQuestionList(resumeId);
                    handleGenerateAndSaveQuestion(resumeId, ExceptionType.PdfConvertException);
                }
                ThreadHelper.sleep(TaskConstant.RETRY_INTERVAL);
            } catch (Exception e) {
                retryCount++;
                if (retryCount >= TaskConstant.MAX_RETRY) {
                    failGenerateAndSaveQuestionList(resumeId);
                    handleGenerateAndSaveQuestion(resumeId, ExceptionType.UnknownException);
                }
                ThreadHelper.sleep(TaskConstant.RETRY_INTERVAL);
            }
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

        successGenerateAndSaveQuestionList(resumeId);
        taskService.sendNotification(resume.getUser().getEmail(), new Response(ResumeConstant.RESUME, resume.getDisplayName()));
    }

    @Async
    public void analyzeVideo(Long analysisId) {
        Analysis analysis = analysisRepository.findById(analysisId).orElseThrow(() -> new InvalidException(ExceptionType.AnalysisNotFoundException));
        saveVideoWithException(analysis, TaskConstant.STATUS_PROCESS);

        /**
         * FastAPI 서버에서 응답하는 경우에는 process, fail, success가 모두 처리되기 때문에 괜찮음
         * 하지만 응답 자체가 실패하는 경우에 FastAPI 측에서 status를 반영시킬 수 없기 때문에 이 경우에는 Spring Boot 측에서 status를 fail로 해줄 필요가 있음
         */
        int retryCount = 0;
        boolean isRetry = true;
        while (isRetry && retryCount < TaskConstant.MAX_RETRY) {
            try {
                analysis.setAnalysisReqTime(LocalDateTime.now());
                analysisRepository.saveAndFlush(analysis);
                fastAiApi.analyzeVideo(analysisId);
                isRetry = false;
            } catch (RestClientException e1) {
                retryCount++;
                if (retryCount >= TaskConstant.MAX_RETRY) {
                    handleAnalyzeVideoException(analysisId, ExceptionType.FastAiApiException);
                }
                ThreadHelper.sleep(TaskConstant.RETRY_INTERVAL);
            } catch (Exception e) {
                retryCount++;
                if (retryCount >= TaskConstant.MAX_RETRY) {
                    handleAnalyzeVideoException(analysisId, ExceptionType.UnknownException);
                }
                ThreadHelper.sleep(TaskConstant.RETRY_INTERVAL);
            }
        }
    }

    private void handleAnalyzeVideoException(Long analysisId, ExceptionType exceptionType) {
        Analysis analysis = analysisRepository.findById(analysisId).orElseThrow(() -> new InvalidException(ExceptionType.AnalysisNotFoundException));
        saveVideoWithException(analysis, TaskConstant.STATUS_FAIL);
        throw new InvalidException(exceptionType);
    }

    private void saveVideoWithException(Analysis analysis, String status) {
        analysis.setAnalysisStatus(status);
        analysisRepository.saveAndFlush(analysis);
    }

    private void handleGenerateAndSaveQuestion(Long resumeId, ExceptionType exceptionType) {
        Resume resume = resumeRepository.findById(resumeId).orElseThrow(() -> new InvalidException(ExceptionType.ResumeNotFoundException));
        saveResumeWithException(resume, TaskConstant.STATUS_FAIL);
        throw new InvalidException(exceptionType);
    }

    private void saveResumeWithException(Resume resume, String status) {
        resume.setAnalysisStatus(status);
        resumeRepository.saveAndFlush(resume);
    }

    private void successGenerateAndSaveQuestionList(Long resumeId) {
        QuestionListHash questionListHash = questionListHashRepository.findById(String.valueOf(resumeId)).orElseThrow(() -> new InvalidException(ExceptionType.QuestionListHashNotFoundException));
        questionListHash.setStatus(RedisConstant.STATUS_SUCCESS);
        questionListHashRepository.save(questionListHash);
    }

    private void failGenerateAndSaveQuestionList(Long resumeId) {
        QuestionListHash questionListHash = questionListHashRepository.findById(String.valueOf(resumeId)).orElseThrow(() -> new InvalidException(ExceptionType.QuestionListHashNotFoundException));
        questionListHash.setStatus(RedisConstant.STATUS_FAIL);
        questionListHashRepository.save(questionListHash);
    }

    private void processGenerateAndSaveQuestionList(Long resumeId) {
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
