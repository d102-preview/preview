package com.d102.file.util;

import com.d102.common.constant.FileConstant;
import com.d102.common.constant.ProfileExtension;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import org.apache.commons.io.FilenameUtils;
import org.apache.commons.lang3.ArrayUtils;
import org.apache.commons.lang3.StringUtils;
import org.apache.tika.Tika;
import org.springframework.security.core.parameters.P;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

/**
 * @author D102
 */
public class ProfileValidator implements ConstraintValidator<ProfileValid, MultipartFile> {

    private ProfileValid annotation;

    @Override
    public void initialize(ProfileValid profileValid) {
        annotation = profileValid;
    }

    @Override
    public boolean isValid(MultipartFile profile, ConstraintValidatorContext context) {
        if (profile.isEmpty()) {
            context.buildConstraintViolationWithTemplate("Profile is empty").addConstraintViolation();
            return false;
        }

        final String name = profile.getOriginalFilename();
        if (StringUtils.isBlank(name)) {
            context.buildConstraintViolationWithTemplate("Profile name is empty").addConstraintViolation();
            return false;
        }

        try {
            int size = profile.getBytes().length;
            if (size == 0) {
                context.buildConstraintViolationWithTemplate("Profile size is empty").addConstraintViolation();
                return false;
            }

            /* 10MB */
            if (size > FileConstant.PROFILE_SIZE_LIMIT) {
                context.buildConstraintViolationWithTemplate("Profile size is too large").addConstraintViolation();
                return false;
            }
        } catch (IOException e) {
            context.buildConstraintViolationWithTemplate("Error while reading profile").addConstraintViolation();
            return false;
        }

        final String extension = FilenameUtils.getExtension(name);
        final ProfileExtension[] allowedExtensions = annotation.allowedExtensions();
        boolean isValidExtension = false;
        for (ProfileExtension allowedExtension : allowedExtensions) {
            if (StringUtils.equals(allowedExtension.getProfileExtensionLowerCase(), extension.toLowerCase())) {
                isValidExtension = true;
                break;
            }
        }
        if (!isValidExtension) {
            context.buildConstraintViolationWithTemplate("Invalid profile extension").addConstraintViolation();
            return false;
        }

        final String detectedMimeType = getMimeTypeByTika(profile);
        boolean isValidMimeType = false;
        for (ProfileExtension allowedExtension : allowedExtensions) {
            if (ArrayUtils.contains(allowedExtension.getProfileMimeTypes(), detectedMimeType)) {
                isValidMimeType = true;
                break;
            }
        }
        if (!isValidMimeType) {
            context.buildConstraintViolationWithTemplate("Modified profile extension").addConstraintViolation();
            return false;
        }

        return true;
    }

    /**
     * Get mime type by Tika
     *
     * @param profile
     * @return
     */
    private String getMimeTypeByTika(MultipartFile profile) {
        try {
            return new Tika().detect(profile.getInputStream());
        } catch (IOException e) {
            return null;
        }
    }

}
