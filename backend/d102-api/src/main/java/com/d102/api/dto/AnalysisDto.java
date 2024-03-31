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

    @Data
    public static class RawDetailResponse {

        private String emotion;
        private String intent;
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
        private Map<String, Object> emotionMap;
    }

}
