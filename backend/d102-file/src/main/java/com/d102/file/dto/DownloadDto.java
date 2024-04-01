package com.d102.file.dto;

import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.web.servlet.mvc.method.annotation.StreamingResponseBody;

public class DownloadDto {

    @Builder
    @Data
    public static class ProfileResponse {

        private String profileType;
        private byte[] profile;
    }

    @Builder
    @Data
    public static class ResumeResponse {

        private String resumeName;
        private String resumeLength;
        private String resumeType;
        private byte[] resume;
    }

    @Builder
    @Data
    public static class ThumbnailResponse {

        private String thumbnailType;
        private byte[] thumbnail;
    }

    @Builder
    @Data
    public static class VideoResponse {

        private String videoLength;
        private byte[] video;
    }

}
