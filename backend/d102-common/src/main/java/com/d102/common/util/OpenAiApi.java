package com.d102.common.util;

import lombok.Data;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import java.io.IOException;
import java.util.Base64;
import java.util.List;

@Component
public class OpenAiApi {

    @Value("${open-ai.url}")
    private String OPENAI_API_URL;

    @Value("${open-ai.secret-key}")
    private String API_KEY;

    public Response generateQuestionListByImage(List<byte[]> imageList) throws IOException {
        StringBuilder imageListJson = new StringBuilder();

        for (byte[] image : imageList) {
            String base64Image = encodeImageToBase64(image);
            imageListJson.append(String.format(
                    "{ \"type\": \"image_url\", \"image_url\": { \"url\": \"data:image/jpeg;base64,%s\" } },", base64Image));
        }
        imageListJson.setLength(imageListJson.length() - 1);

        HttpHeaders headers = new HttpHeaders();
        headers.set(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE);
        headers.set(HttpHeaders.AUTHORIZATION, "Bearer " + API_KEY);

        HttpEntity<String> request = getQuestionListHttpEntity(imageListJson, headers);

        return new RestTemplate().postForObject(OPENAI_API_URL, request, OpenAiApi.Response.class);
    }

    public Response generateFollowUpQuestion(String question, String answer) {
        StringBuilder questionAndAnswer = new StringBuilder();
        questionAndAnswer.append("Interviewer Question (Korean): ").append(JsonStringEscapeConverter.convertToJsonString(question)).append(" ");
        questionAndAnswer.append("Interviewee Answer (Korean): ").append(JsonStringEscapeConverter.convertToJsonString(answer)).append(" ");
        questionAndAnswer.append("This is a history of the previous conversation. You are interviewer. Please provide a follow-up question in Korean based on the previous conversations. The questions must contain the answers of the previous interviewee. Like this example: You say you worked on a project using Java. What was the most challenging part of that project?");

        StringBuilder questionAndAnswerJson = new StringBuilder();
        questionAndAnswerJson.append(String.format("{ \"role\": \"system\", \"content\": \"%s\" }", questionAndAnswer.toString()));

        HttpHeaders headers = new HttpHeaders();
        headers.set(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE);
        headers.set(HttpHeaders.AUTHORIZATION, "Bearer " + API_KEY);

        HttpEntity<String> request = getFollowUpQuestionHttpEntity(questionAndAnswerJson, headers);

        return new RestTemplate().postForObject(OPENAI_API_URL, request, OpenAiApi.Response.class);
    }

    public Response generateQuestionListByText(String text) {
        StringBuilder content = new StringBuilder();
        content.append("My resume (Korean): ").append(JsonStringEscapeConverter.convertToJsonString(text)).append(" ");
        content.append("This is my resume. Please provide 10 questions in the JSON format (no code block) with each question in Korean about my resume as a key-value pair, where the key is a string number and the value is the question string. For example: { 1: Question 1 }. The questions should relate to a variety of topics including technical background, project experience, and reasons for technology stack choices.");

        StringBuilder contentJson = new StringBuilder();
        contentJson.append(String.format("{ \"role\": \"user\", \"content\": \"%s\" }", content.toString()));

        HttpHeaders headers = new HttpHeaders();
        headers.set(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE);
        headers.set(HttpHeaders.AUTHORIZATION, "Bearer " + API_KEY);

        HttpEntity<String> request = generateQuestionListByText(contentJson, headers);

        return new RestTemplate().postForObject(OPENAI_API_URL, request, OpenAiApi.Response.class);
    }

    private HttpEntity<String> generateQuestionListByText(StringBuilder contentJson, HttpHeaders headers) {
        String payloadTemplate = "{ \"model\": \"gpt-4\", " +
                "\"messages\": [ " +
                "%s ] }";

        String payload = String.format(payloadTemplate, contentJson.toString());

        return new HttpEntity<>(payload, headers);
    }

    private HttpEntity<String> getFollowUpQuestionHttpEntity(StringBuilder questionAndAnswerJson, HttpHeaders headers) {
        String payloadTemplate = "{ \"model\": \"gpt-4\", " +
                "\"messages\": [ " +
                "%s ] }";

        String payload = String.format(payloadTemplate, questionAndAnswerJson.toString());

        return new HttpEntity<>(payload, headers);
    }

    private static HttpEntity<String> getQuestionListHttpEntity(StringBuilder imagesJson, HttpHeaders headers) {
        String payloadTemplate = "{ \"model\": \"gpt-4-vision-preview\", " +
                "\"messages\": [ " +
                "{ \"role\": \"user\", " +
                "\"content\": [ " +
                "{ \"type\": \"text\", " +
                "\"text\": \"This is my resume. Please provide 10 questions in the JSON format (no code block) with each question in Korean about my resume as a key-value pair, where the key is a string number and the value is the question string. For example: { 1: Question 1 }. The questions should relate to a variety of topics including technical background, project experience, and reasons for technology stack choices.\" }, " +
                "%s ] } ]," +
                " \"max_tokens\": 4096 }";

        String payload = String.format(payloadTemplate, imagesJson.toString());

        return new HttpEntity<>(payload, headers);
    }

    private String encodeImageToBase64(byte[] image) throws IOException {
        return Base64.getEncoder().encodeToString(image);
    }

    @Data
    public static class Response {

        private String id;
        private String object;
        private long created;
        private String model;
        private Usage usage;
        private List<Choice> choices;

        @Data
        public static class Usage {

            private int promptTokens;
            private int completionTokens;
            private int totalTokens;
        }

        @Data
        public static class Choice {

            private Message message;
            private String finishReason;
            private int index;

            @Data
            public static class Message {

                private String role;
                private String content;
            }
        }
    }

}
