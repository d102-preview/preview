package com.d102.api.dto;

import lombok.Data;

public class CommonScriptDto {

    @Data
    public static class Response {

        private int id;
        private String script;
    }

}
