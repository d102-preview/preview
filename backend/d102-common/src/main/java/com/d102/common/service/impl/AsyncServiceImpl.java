package com.d102.common.service.impl;

import com.d102.common.constant.FileConstant;
import com.d102.common.constant.RedisConstant;
import com.d102.common.domain.jpa.Resume;
import com.d102.common.domain.jpa.ResumeQuestion;
import com.d102.common.domain.redis.QuestionListHash;
import com.d102.common.exception.ExceptionType;
import com.d102.common.exception.custom.InvalidException;
import com.d102.common.repository.jpa.ResumeQuestionRepository;
import com.d102.common.repository.jpa.ResumeRepository;
import com.d102.common.repository.redis.QuestionListHashRepository;
import com.d102.common.service.AsyncService;
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
    private final OpenAiApi openAiApi;

    @Async
    public void generateAndSaveQuestionList(String savePath, Long resumeId) {
        Resume resume = resumeRepository.findById(resumeId).orElseThrow(() -> new InvalidException(ExceptionType.ResumeNotFoundException));
        processQuestionList(resumeId);

        /**
         * 1. savePath에서 pdf 파일을 읽어내서 이미지로 변환하고 imagePathList를 생성
         * 2. imagePathList에서 List<byte[]>로 변환
         * 3. 변환한 List<byte[]>를 OpenAiApi에 전달하여 질문 생성
         */
        List<byte[]> imageList = convertPdfToImage(savePath);
        OpenAiApi.Response response = null;
        try {
            resume.setAnalysisReqTime(LocalDateTime.now());
            resumeRepository.saveAndFlush(resume);
            response = openAiApi.generateQuestionList(imageList);
        } catch (RestClientException e) {
            failQuestionList(resumeId);
            throw new InvalidException(ExceptionType.OpenAiApiException);
        } catch (IOException e) {
            failQuestionList(resumeId);
            throw new InvalidException(ExceptionType.Base64ConvertException);
        } catch (Exception e) {
            failQuestionList(resumeId);
            throw new InvalidException(ExceptionType.UnknownException);
        }
        resume.setAnalysisEndTime(LocalDateTime.now());
        resumeRepository.saveAndFlush(resume);

        String jsonString = response.getChoices().getFirst().getMessage().getContent();
        JsonObject jsonObject = JsonParser.parseString(jsonString).getAsJsonObject();
        List<String> questionList = jsonObject.entrySet().stream().map(entry -> entry.getValue().getAsString()).toList();

        /**
         * 4. Resume에 대한 questionList에 들어있는 ResumeQuestion을 저장
         */
        List<ResumeQuestion> resumeQuestionList = questionList.stream()
                .map(question -> ResumeQuestion.builder().question(question).resume(resume).build())
                .toList();
        resumeQuestionRepository.saveAllAndFlush(resumeQuestionList);

        successQuestionList(resumeId);
    }

    private void successQuestionList(Long id) {
        QuestionListHash questionListHash = questionListHashRepository.findById(id).orElseThrow(() -> new InvalidException(ExceptionType.QuestionListHashNotFoundException));
        questionListHash.setStatus(RedisConstant.STATUS_SUCCESS);
        questionListHashRepository.save(questionListHash);
    }

    private void failQuestionList(Long id) {
        QuestionListHash questionListHash = questionListHashRepository.findById(id).orElseThrow(() -> new InvalidException(ExceptionType.QuestionListHashNotFoundException));
        questionListHash.setStatus(RedisConstant.STATUS_FAIL);
        questionListHashRepository.save(questionListHash);
    }

    private void processQuestionList(Long id) {
        questionListHashRepository.save(QuestionListHash.builder().id(id).status(RedisConstant.STATUS_PROCESS).build());
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
