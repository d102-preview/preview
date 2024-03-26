package com.d102.file.service.impl;

import com.d102.common.domain.Resume;
import com.d102.common.exception.ExceptionType;
import com.d102.common.exception.custom.NotFoundException;
import com.d102.common.repository.ResumeRepository;
import com.d102.common.util.SecurityHelper;
import com.d102.common.util.UserVerifier;
import com.d102.file.dto.DownloadDto;
import com.d102.file.service.DownloadService;
import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.StringUtils;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;

@RequiredArgsConstructor
@Service
public class DownloadServiceImpl implements DownloadService {

    private final ResumeRepository resumeRepository;
    private final SecurityHelper securityHelper;

    public DownloadDto.ProfileResponse downloadProfile(Path profilePath) {
        try {
            return DownloadDto.ProfileResponse.builder()
                    .profileType(MediaType.parseMediaType(Files.probeContentType(profilePath)).toString())
                    .profile(Files.readAllBytes(profilePath))
                    .build();
        } catch (IOException e) {
            throw new NotFoundException(ExceptionType.ProfileDownloadException);
        }
    }

    public DownloadDto.ResumeResponse downloadResume(Long resumeId) {
        Resume resume = resumeRepository.findById(resumeId).orElseThrow(() -> new NotFoundException(ExceptionType.ResumeNotFoundException));

        UserVerifier.checkLoginUserAndResumeUser(securityHelper.getLoginUsername(), resume.getUser().getEmail());

        try {
            Path resumePath = Path.of(resume.getFilePath());
            return DownloadDto.ResumeResponse.builder()
                    .name(resume.getName())
                    .length(String.valueOf(Files.size(resumePath)))
                    .resumeType(MediaType.parseMediaType(Files.probeContentType(resumePath)).toString())
                    .resume(Files.readAllBytes(resumePath))
                    .build();
        } catch (Exception e) {
            throw new NotFoundException(ExceptionType.ResumeDownloadException);
        }
    }

}
