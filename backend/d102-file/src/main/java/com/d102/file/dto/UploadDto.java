package com.d102.file.dto;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

public class UploadDto {

    @Data
    public static class ImageRequest {

        private MultipartFile multipartFile;

    }

    @Data
    public static class ImageResponse {

        private String imageUrl;

    }

}
