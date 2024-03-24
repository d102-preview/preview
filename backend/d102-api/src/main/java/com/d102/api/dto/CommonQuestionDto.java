package com.d102.api.dto;

import lombok.Builder;
import lombok.Data;

import java.util.List;

public class CommonQuestionDto {

    @Builder
    @Data
    public static class Response {

        private CommonScriptDto.Response commonScript;
        private List<CommonKeywordDto.Response> commonKeywords;
    }

    @Data
    public static class ListResponse {

        private int id;
        private String question;
    }

}
