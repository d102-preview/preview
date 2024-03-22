package com.d102.file.service.impl;

import com.d102.file.dto.UploadDto;
import com.d102.file.service.UploadService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class UploadServiceImpl implements UploadService {

    @Override
    public UploadDto.ImageResponse uploadProfileImage(UploadDto.ImageRequest imageRequestDto) {

        return null;

    }

}
