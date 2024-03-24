package com.d102.api.dto;

import jakarta.validation.constraints.Size;
import lombok.Data;

public class CommonKeywordDto {

    @Data
    public static class Request {

        @Size(max = 16)
        private String keyword;
    }

    @Data
    public static class Response {

        private int id;
        private String keyword;
    }

}
