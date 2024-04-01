package com.d102.api.dto;

import com.d102.common.constant.QuestionType;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

public class AnalysisDto {

    @Data
    public static class ListResponse {

        private Long id;
        private LocalDateTime startTime;
        private List<AnalysisResponse> analysisList;
    }

    @Data
    public static class AnalysisResponse {

        private Long id;
        private String question;
        private String thumbnailPath;
        private int videoLength;
    }

    @Builder
    @Data
    public static class DetailResponse {

        private Long id;
        private QuestionType questionType;
        private String question;
        private String answer;
        private String videoPath;
        private String thumbnailPath;
        private List<String> keywordList;
        private int videoLength;
        private EmotionResponse emotionMap;
        private List<IntentResponse> intentList;
    }

    @Data
    public static class EmotionResponse {

        private EmotionRatioResponse ratio;
        private Map<String, Double> list;
    }

    @Data
    public static class EmotionRatioResponse {

        private Double positive;
        private Double negative;
        private Double neutral;
    }

    @Data
    public static class IntentResponse {

        private String category;
        private String expression;
        private Double ratio;
    }

}
