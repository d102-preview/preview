package com.d102.file.service.impl;

import com.d102.common.exception.ExceptionType;
import com.d102.common.exception.custom.DownloadException;
import com.d102.file.dto.DownloadDto;
import com.d102.file.service.DownloadService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.Base64;

@RequiredArgsConstructor
@Service
public class DownloadServiceImpl implements DownloadService {

    public byte[] downloadProfile(String profileUrl) {
        try {
            return Files.readAllBytes(Paths.get(profileUrl));
        } catch (IOException e) {
            throw new DownloadException(ExceptionType.ProfileDownloadException);
        }
    }

}
