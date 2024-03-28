package com.d102.api.dto;

import lombok.Data;

public class ResumeScriptDto {

    @Data
    public static class Response {

        private Long id;
        private String script;
    }

}
