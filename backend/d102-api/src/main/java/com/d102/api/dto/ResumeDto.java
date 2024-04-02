package com.d102.api.dto;

import lombok.Data;

public class ResumeDto {

    @Data
    public static class Response {

        private Long id;
        private String displayName;
        private Long fileSize;
        private String filePath;
    }

    @Data
    public static class ListResponse {

        private Long id;
        private String displayName;
        private Long fileSize;
        private String analysisStatus;
    }

}
