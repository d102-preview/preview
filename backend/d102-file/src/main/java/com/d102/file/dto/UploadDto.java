package com.d102.file.dto;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

public class UploadDto {

    @Data
    public static class profileImageRequest {

        private MultipartFile profileImage;

    }

    @Data
    public static class profileImageResponse {

        private String profileImageUrl;

    }

}
