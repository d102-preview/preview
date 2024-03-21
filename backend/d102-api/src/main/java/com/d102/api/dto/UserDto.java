package com.d102.api.dto;

import com.d102.common.utils.RegExpressions;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Data;

public class UserDto {

    @Data
    public static class JoinRequest {

        @NotBlank
        @Size(max = 64)
        @Email
        private String email;

        @NotBlank
        @Size(min = 8, max = 20)
        @Pattern(regexp = RegExpressions.strongPassword)
        private String password;

        @NotBlank
        @Size(max = 8)
        private String name;

    }

    @Data
    public static class Response {

        private String email;
        private String profileImage;
        private String name;

    }

}
