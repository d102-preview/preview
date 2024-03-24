package com.d102.api.dto;

import lombok.Data;

public class CommonQuestionDto {

    @Data
    public static class Response {

        private int id;
        private String question;
    }

}
