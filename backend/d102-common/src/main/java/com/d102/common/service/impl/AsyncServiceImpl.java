package com.d102.common.service.impl;

import com.d102.common.domain.jpa.Resume;
import com.d102.common.domain.jpa.ResumeQuestion;
import com.d102.common.domain.redis.QuestionListHash;
import com.d102.common.exception.ExceptionType;
import com.d102.common.exception.custom.InvalidException;
import com.d102.common.repository.jpa.ResumeQuestionRepository;
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
import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@RequiredArgsConstructor
@Service
public class AsyncServiceImpl implements AsyncService {

    private final ResumeQuestionRepository resumeQuestionRepository;
    private final QuestionListHashRepository questionListHashRepository;
    private final OpenAiApi openAiApi;

    @Async
    public void generateAndSaveQuestionList(String savePath, Resume resume) {
        Long resumeId = resume.getId();
        startQuestionList(resumeId);

        /**
         * 1. savePath에서 pdf 파일을 읽어내서 이미지로 변환하고 imagePathList를 생성
         * 2. imagePathList에서 List<byte[]>로 변환
         * 3. 변환한 List<byte[]>를 OpenAiApi에 전달하여 질문 생성
         */
        List<byte[]> imageList = convertPdfToImage(savePath);
        OpenAiApi.Response response = null;
        try {
            response = openAiApi.generateQuestionList(imageList);
        } catch (IOException e) {
            throw new InvalidException(ExceptionType.Base64ConvertException);
        }
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

        endQuestionList(resumeId);
    }

    public void generateAndSaveFollowUpQuestion(String question, String answer) {

    }

    private void endQuestionList(Long id) {
        questionListHashRepository.deleteById(id);
    }

    private void startQuestionList(Long id) {
        questionListHashRepository.save(QuestionListHash.builder().id(id).status("processing").build());
    }

    private List<byte[]> convertPdfToImage(String savePath) {
        try (PDDocument document = PDDocument.load(new File(savePath))) {
            PDFRenderer pdfRenderer = new PDFRenderer(document);
            List<byte[]> imageList = new ArrayList<>();

            for (int i = 0; i < document.getNumberOfPages(); i++) {
                BufferedImage imageObject = pdfRenderer.renderImageWithDPI(i, 30, ImageType.RGB);
                ByteArrayOutputStream baos = new ByteArrayOutputStream();
                ImageIO.write(imageObject, "jpeg", baos);
                byte[] imageBytes = baos.toByteArray();
                imageList.add(imageBytes);
            }

            return imageList;
        } catch (IOException e) {
            throw new InvalidException(ExceptionType.PdfConvertException);
        }
    }

}
