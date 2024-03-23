package com.d102.api.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

public class EmailDto {

    @Data
    public static class Request {

        @NotBlank
        @Size(max = 64)
        @Email
        private String email;
    }

    @Data
    public static class VerifyRequest {

        @NotBlank
        @Size(max = 64)
        @Email
        private String email;

        private int authorizationCode;
    }

}
