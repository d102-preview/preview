package com.d102.api.dto;

import jakarta.validation.constraints.Size;
import lombok.Data;

public class ResumeScriptDto {

    @Data
    public static class Request {

        @Size(max = 512)
        private String script;
    }

    @Data
    public static class Response {

        private Long id;
        private String script;
    }

}
