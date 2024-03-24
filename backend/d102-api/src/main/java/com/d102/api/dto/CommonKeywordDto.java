package com.d102.api.dto;

import lombok.Data;

public class CommonKeywordDto {

    @Data
    public static class Response {

        private int id;
        private String keyword;
    }

}
