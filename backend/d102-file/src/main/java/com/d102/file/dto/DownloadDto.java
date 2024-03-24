package com.d102.file.dto;

import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;

public class DownloadDto {

    @Builder
    @Data
    public static class ProfileResponse {

        private MediaType profileType;
        private byte[] profile;

    }

}
