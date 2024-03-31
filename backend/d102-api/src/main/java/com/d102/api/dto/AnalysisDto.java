package com.d102.api.dto;

import com.d102.common.domain.jpa.Analysis;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

public class AnalysisDto {

    @Data
    public static class ListResponse {
        private Long id;
        private LocalDateTime startTime;
        private List<AnalysisResponse> analysisList;

        public static class AnalysisResponse {
            private Long id;
            private String question;
            private String thumbnailPath;
            private int videoLength;
        }
    }

}
