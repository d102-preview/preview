package com.d102.file.dto;

import com.d102.common.constant.ProfileExtension;
import com.d102.common.constant.ResumeExtension;
import com.d102.file.util.ProfileValid;
import com.d102.file.util.ResumeValid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Builder;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

public class UploadDto {

    @Data
    public static class ProfileRequest {

        @ProfileValid(allowedExtensions = {ProfileExtension.JPG, ProfileExtension.PNG, ProfileExtension.GIF, ProfileExtension.BMP}, message = "Invalid profile")
        private MultipartFile profile;
    }

    @Builder
    @Data
    public static class ProfileResponse {

        private String url;
    }

    @Data
    public static class ResumeRequest {

        @NotBlank
        @Size(max = 16)
        private String displayName;

        @ResumeValid(allowedExtensions = {ResumeExtension.PDF}, message = "Invalid resume")
        private MultipartFile resume;
    }

    @Data
    public static class ResumeResponse {

        private int id;
        private String name;
        private String displayName;
    }

}
