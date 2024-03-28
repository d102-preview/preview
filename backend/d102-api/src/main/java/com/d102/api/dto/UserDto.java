package com.d102.api.dto;

import com.d102.common.util.RegExpressions;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Data;

import java.util.List;

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
    public static class LoginRequest {

        @NotBlank
        @Size(max = 64)
        @Email
        private String email;

        @NotBlank
        @Size(min = 8, max = 20)
        private String password;
    }

    @Data
    public static class UpdateRequest {

        @NotBlank
        @Size(max = 8)
        private String name;
    }

    @Data
    public static class PasswordUpdateRequest {

        @NotBlank
        @Size(min = 8, max = 20)
        private String currentPassword;

        @NotBlank
        @Size(min = 8, max = 20)
        private String changedPassword;

        @NotBlank
        @Size(min = 8, max = 20)
        private String checkChangePassword;
    }

    @Data
    public static class Response {

        private String email;
        private String profileImageName;
        private String profileImageUrl;
        private String name;
    }

    @Data
    public static class ResumeResponse {

        private String email;
        private String profileImageName;
        private String profileImageUrl;
        private String name;
        private List<ResumeDto.Response> resumeList;
    }

}
