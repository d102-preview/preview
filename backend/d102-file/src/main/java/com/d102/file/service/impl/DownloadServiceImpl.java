package com.d102.file.service.impl;

import com.d102.common.exception.ExceptionType;
import com.d102.common.exception.custom.DownloadException;
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

    public DownloadDto.ProfileResponse downloadProfile(Path profileUrl) {
        try {
            return DownloadDto.ProfileResponse.builder()
                    .profileType(MediaType.parseMediaType(Files.probeContentType(profileUrl)))
                    .profile(Files.readAllBytes(profileUrl))
                    .build();
        } catch (IOException e) {
            throw new DownloadException(ExceptionType.ProfileDownloadException);
        }
    }

}
