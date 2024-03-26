package com.d102.file.annotation;

import com.d102.common.constant.FileConstant;
import com.d102.common.constant.ResumeExtension;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import org.apache.commons.io.FilenameUtils;
import org.apache.commons.lang3.ArrayUtils;
import org.apache.commons.lang3.StringUtils;
import org.apache.tika.Tika;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;

/**
 * @author D102
 */
public class ResumeValidator implements ConstraintValidator<ValidResume, MultipartFile> {

    private ValidResume annotation;

    @Override
    public void initialize(ValidResume validResume) {
        annotation = validResume;
    }

    @Override
    public boolean isValid(MultipartFile resume, ConstraintValidatorContext context) {
        if (resume.isEmpty()) {
            context.buildConstraintViolationWithTemplate("Resume is empty").addConstraintViolation();
            return false;
        }

        final String name = resume.getOriginalFilename();
        if (StringUtils.isBlank(name)) {
            context.buildConstraintViolationWithTemplate("Resume name is empty").addConstraintViolation();
            return false;
        }

        try {
            int size = resume.getBytes().length;
            if (size == 0) {
                context.buildConstraintViolationWithTemplate("Resume size is empty").addConstraintViolation();
                return false;
            }

            /* 30MB */
            if (size > FileConstant.RESUME_SIZE_LIMIT) {
                context.buildConstraintViolationWithTemplate("Resume size is too large").addConstraintViolation();
                return false;
            }
        } catch (IOException e) {
            context.buildConstraintViolationWithTemplate("Error while reading resume").addConstraintViolation();
            return false;
        }

        final String extension = FilenameUtils.getExtension(name);
        final ResumeExtension[] allowedExtensionList = annotation.allowedExtensionList();
        boolean isValidExtension = false;
        for (ResumeExtension allowedExtension : allowedExtensionList) {
            if (StringUtils.equals(allowedExtension.getResumeExtensionLowerCase(), extension.toLowerCase())) {
                isValidExtension = true;
                break;
            }
        }
        if (!isValidExtension) {
            context.buildConstraintViolationWithTemplate("Invalid profile extension").addConstraintViolation();
            return false;
        }

        final String detectedMimeType = getMimeTypeByTika(resume);
        boolean isValidMimeType = false;
        for (ResumeExtension allowedExtension : allowedExtensionList) {
            if (ArrayUtils.contains(allowedExtension.getResumeMimeTypes(), detectedMimeType)) {
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
     * @param resume
     * @return
     */
    private String getMimeTypeByTika(MultipartFile resume) {
        try {
            return new Tika().detect(resume.getInputStream());
        } catch (IOException e) {
            return null;
        }
    }

}
