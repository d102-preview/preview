package com.d102.file.service.impl;

import com.d102.common.domain.Resume;
import com.d102.common.exception.ExceptionType;
import com.d102.common.exception.custom.DownloadException;
import com.d102.common.repository.ResumeRepository;
import com.d102.file.dto.DownloadDto;
import com.d102.file.service.DownloadService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Base64;

@RequiredArgsConstructor
@Service
public class DownloadServiceImpl implements DownloadService {

    private final ResumeRepository resumeRepository;

    public DownloadDto.ProfileResponse downloadProfile(Path profilePath) {
        try {
            return DownloadDto.ProfileResponse.builder()
                    .profileType(MediaType.parseMediaType(Files.probeContentType(profilePath)).toString())
                    .profile(Files.readAllBytes(profilePath))
                    .build();
        } catch (IOException e) {
            throw new DownloadException(ExceptionType.ProfileDownloadException);
        }
    }

    public DownloadDto.ResumeResponse downloadResume(Long resumeId) {
        Resume resume = resumeRepository.findById(resumeId).orElseThrow(() -> new DownloadException(ExceptionType.ResumeNotFoundException));

        try {
            Path resumePath = Path.of(resume.getFilePath());
            return DownloadDto.ResumeResponse.builder()
                    .name(resume.getName())
                    .length(String.valueOf(Files.size(resumePath)))
                    .resumeType(MediaType.parseMediaType(Files.probeContentType(resumePath)).toString())
                    .resume(Files.readAllBytes(resumePath))
                    .build();
        } catch (Exception e) {
            throw new DownloadException(ExceptionType.ResumeDownloadException);
        }
    }


}
