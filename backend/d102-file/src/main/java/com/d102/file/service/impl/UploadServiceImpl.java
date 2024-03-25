package com.d102.file.service.impl;

import com.d102.common.constant.UploadConstant;
import com.d102.common.dto.ResumeDto;
import com.d102.common.exception.ExceptionType;
import com.d102.common.exception.custom.UploadException;
import com.d102.common.repository.UserRepository;
import com.d102.common.util.SecurityHelper;
import com.d102.file.dto.UploadDto;
import com.d102.file.service.UploadService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.apache.tomcat.util.http.fileupload.FileUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.io.File;
import java.io.IOException;
import java.net.URLEncoder;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.StringJoiner;
import java.util.UUID;

@RequiredArgsConstructor
@Service
public class UploadServiceImpl implements UploadService {

    @Value("${download.profile.base-url}")
    private String profileBaseUrl;

    private final UserRepository userRepository;
    private final SecurityHelper securityHelper;

    @Transactional
    public UploadDto.ProfileResponse uploadProfile(UploadDto.ProfileRequest profileRequestDto) {
        checkType(profileRequestDto.getProfile());

        Path basePath = UploadConstant.PROFILE_DIR.resolve(securityHelper.getLoginUsername());
        String savePath = saveProfile(basePath, profileRequestDto.getProfile());
        String profileUrl = makeProfileUrl(savePath);

        userRepository.findByEmail(securityHelper.getLoginUsername())
                .ifPresent(user -> {
                    user.setProfileImageName(profileRequestDto.getProfile().getOriginalFilename());
                    user.setProfileImageUrl(profileUrl);
                    userRepository.save(user);
                });

        return UploadDto.ProfileResponse.builder()
                .url(profileUrl)
                .build();
    }

    @Override
    public ResumeDto.Response uploadResume(UploadDto.ResumeRequest resumeRequestDto) {
        System.out.println("resumeRequestDto.getResume().getContentType() = " + resumeRequestDto.getResume().getContentType());
        return null;
    }

    private String makeProfileUrl(String savePath) {
        return new StringBuilder()
                .append(profileBaseUrl)
                .append(URLEncoder.encode(savePath))
                .toString();
    }

    private String saveProfile(Path dir, MultipartFile file) {
        try {
            System.out.println("file.getContentType() = " + file.getContentType());
            Files.createDirectories(dir);
            FileUtils.cleanDirectory(new File(dir.toString()));
            String fileName = new StringJoiner("_")
                    .add(UUID.randomUUID().toString())
                    .add(file.getOriginalFilename())
                    .toString();
            Path dest = dir.resolve(fileName);
            file.transferTo(dest);

            return dest.toString();
        } catch (IOException e) {
            throw new UploadException(ExceptionType.ProfileUploadException);
        }
    }

    private void checkType(MultipartFile file) {
        if (!UploadConstant.ALLOWED_PROFILE_EXTENSIONS.contains(file.getContentType())) {
            throw new UploadException(ExceptionType.ProfileTypeException);
        }
    }

}
