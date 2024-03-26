package com.d102.api.dto;

import lombok.Builder;
import lombok.Data;

import java.util.List;

public class CommonQuestionDto {

    @Builder
    @Data
    public static class Response {

        private CommonScriptDto.Response script;
        private List<CommonKeywordDto.Response> keywordList;
    }

    @Data
    public static class ListResponse {

        private Long id;
        private String question;
    }

}
