package com.d102.api.dto;

import lombok.Builder;
import lombok.Data;

import java.util.List;

public class ResumeQuestionDto {

    @Builder
    @Data
    public static class Response {

        private ResumeScriptDto.Response script;
        private List<ResumeKeywordDto.Response> keywordList;
    }

    @Data
    public static class ListResponse {

        private Long id;
        private String question;
    }

}
