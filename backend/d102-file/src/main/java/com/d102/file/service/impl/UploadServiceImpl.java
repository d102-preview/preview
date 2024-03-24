package com.d102.file.service.impl;

import com.d102.common.constant.UploadConstant;
import com.d102.common.exception.ExceptionType;
import com.d102.common.exception.custom.UploadException;
import com.d102.file.dto.UploadDto;
import com.d102.file.service.UploadService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.StringJoiner;
import java.util.UUID;

@RequiredArgsConstructor
@Service
public class UploadServiceImpl implements UploadService {

    @Transactional
    public String uploadProfile(UploadDto.profileRequest profileRequestDto) {
        return saveFile(UploadConstant.PROFILE_DIR, profileRequestDto.getProfile());
    }

    private String saveFile(Path dir, MultipartFile file) {
        try {
            /* 유저별로 디렉토리 생성하는 것도 좋을 듯함 */
            Files.createDirectories(dir);
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

}
