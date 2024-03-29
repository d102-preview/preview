package com.d102.api.dto;

import lombok.Builder;
import lombok.Data;

public class FollowUpQuestionDto {

    @Data
    public static class Request {

        private String question;
        private String answer;
    }

    @Builder
    @Data
    public static class Response {

        private String question;
    }

}
