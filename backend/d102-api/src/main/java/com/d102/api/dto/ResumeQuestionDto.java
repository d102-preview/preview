package com.d102.api.dto;

import lombok.Data;

public class ResumeQuestionDto {

    @Data
    public static class ListResponse {

        private Long id;
        private String question;
    }

}
