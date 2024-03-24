package com.d102.file.dto;

import lombok.Data;

public class DownloadDto {

    @Data
    public static class ProfileResponse {

        private byte[] profile;

    }

}
