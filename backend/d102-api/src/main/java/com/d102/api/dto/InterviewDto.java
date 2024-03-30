package com.d102.api.dto;

import com.d102.common.constant.QuestionType;
import lombok.Builder;
import lombok.Data;

import java.util.List;

public class InterviewDto {

    @Builder
    @Data
    public static class ListResponse {

        private String question;
        private QuestionType type;
        private List<KeywordResponse> keywordList;
    }

    @Data
    public static class KeywordResponse {

        private String keyword;
    }

}
