package com.d102.api.dto;

import com.d102.common.constant.QuestionType;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

public class InterviewDto {

    @Data
    public static class Request {

        private String type;
        private LocalDateTime startTime;
    }

    @Data
    public static class Response {

        private Long id;
    }

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
