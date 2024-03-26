package com.d102.file.service.impl;

import com.d102.common.constant.FileConstant;
import com.d102.common.domain.Resume;
import com.d102.common.domain.User;
import com.d102.common.exception.ExceptionType;
import com.d102.common.exception.custom.InvalidException;
import com.d102.common.exception.custom.NotFoundException;
import com.d102.common.repository.ResumeRepository;
import com.d102.common.repository.UserRepository;
import com.d102.common.util.SecurityHelper;
import com.d102.file.dto.UploadDto;
import com.d102.file.mapper.UploadMapper;
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
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.List;
import java.util.StringJoiner;
import java.util.UUID;

@RequiredArgsConstructor
@Service
public class UploadServiceImpl implements UploadService {

    @Value("${download.profile.base-url}")
    private String profileBaseUrl;

    private final UserRepository userRepository;
    private final ResumeRepository resumeRepository;
    private final SecurityHelper securityHelper;
    private final UploadMapper uploadMapper;

    @Transactional
    public UploadDto.ProfileResponse uploadProfile(UploadDto.ProfileRequest profileRequestDto) {
        Path basePath = FileConstant.PROFILE_SAVE_DIR.resolve(securityHelper.getLoginUsername());
        String savePath = saveProfile(basePath, profileRequestDto.getProfile());
        String profileUrl = makeProfileUrl(savePath);

        User user = userRepository.findByEmail(securityHelper.getLoginUsername()).orElseThrow(() -> new NotFoundException(ExceptionType.UserNotFoundException));
        user.setProfileImageName(profileRequestDto.getProfile().getOriginalFilename());
        user.setProfileImageUrl(profileUrl);

        return uploadMapper.toProfileResponseDto(userRepository.saveAndFlush(user));
    }

    @Transactional
    public UploadDto.ResumeResponse uploadResume(UploadDto.ResumeRequest resumeRequestDto) {
        Path basePath = FileConstant.RESUME_SAVE_DIR.resolve(securityHelper.getLoginUsername());
        String savePath = saveResume(basePath, resumeRequestDto.getResume());

        Resume resume = uploadMapper.toResume(resumeRequestDto);
        resume.setFileName(resumeRequestDto.getResume().getOriginalFilename());
        resume.setFilePath(savePath);
        resume.setUser(userRepository.findByEmail(securityHelper.getLoginUsername()).orElseThrow(() -> new NotFoundException(ExceptionType.UserNotFoundException)));

        return uploadMapper.toResumeResponseDto(resumeRepository.saveAndFlush(resume));
    }

    private String saveResume(Path basePath, MultipartFile resume) {
        try {
            Files.createDirectories(basePath);
            List<File> files = Files.list(basePath).map(Path::toFile).toList();
            if (files.size() >= FileConstant.RESUME_UPLOAD_LIMIT) {
                throw new InvalidException(ExceptionType.ResumeLimitException);
            }

            Path dest = makeSavePath(basePath, resume);
            resume.transferTo(dest);

            return dest.toString();
        } catch (IOException e) {
            throw new InvalidException(ExceptionType.ResumeUploadException);
        }
    }

    private String makeProfileUrl(String savePath) {
        try {
            return new StringBuilder()
                    .append(profileBaseUrl)
                    .append(URLEncoder.encode(savePath, StandardCharsets.UTF_8))
                    .toString();
        } catch (Exception e) {
            throw new InvalidException(ExceptionType.ProfileUrlException);
        }
    }

    private String saveProfile(Path dir, MultipartFile profile) {
        try {
            Files.createDirectories(dir);
            FileUtils.cleanDirectory(new File(dir.toString()));

            Path dest = makeSavePath(dir, profile);
            profile.transferTo(dest);

            return dest.toString();
        } catch (IOException e) {
            throw new InvalidException(ExceptionType.ProfileUploadException);
        }
    }

    private Path makeSavePath(Path dir, MultipartFile file) {
        String fileName = new StringJoiner("_")
                .add(UUID.randomUUID().toString())
                .add(file.getOriginalFilename())
                .toString();
        return dir.resolve(fileName);
    }

}
