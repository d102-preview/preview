package com.d102.file.dto;

import com.d102.common.constant.ProfileExtension;
import com.d102.common.constant.ResumeExtension;
import com.d102.file.annotation.ValidProfile;
import com.d102.file.annotation.ValidResume;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Builder;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

public class UploadDto {

    @Data
    public static class ProfileRequest {

        @ValidProfile(allowedExtensionList = {ProfileExtension.JPG, ProfileExtension.PNG, ProfileExtension.GIF, ProfileExtension.BMP}, message = "Invalid profile")
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

        @ValidResume(allowedExtensionList = {ResumeExtension.PDF}, message = "Invalid resume")
        private MultipartFile resume;
    }

    @Data
    public static class ResumeResponse {

        private int id;
        private String fileName;
        private String displayName;
    }

}