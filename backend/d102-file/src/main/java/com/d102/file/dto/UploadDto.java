package com.d102.file.dto;

import lombok.Builder;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

public class UploadDto {

    @Data
    public static class ProfileRequest {

        private MultipartFile profile;
    }

    @Builder
    @Data
    public static class ProfileResponse {

        private String url;
    }

}
