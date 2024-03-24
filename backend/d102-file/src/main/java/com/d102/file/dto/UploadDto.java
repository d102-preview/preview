package com.d102.file.dto;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

public class UploadDto {

    @Data
    public static class profileRequest {

        private MultipartFile profile;

    }

    @Data
    public static class profileResponse {

        private String profileUrl;

    }

}
