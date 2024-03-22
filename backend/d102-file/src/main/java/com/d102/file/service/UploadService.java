package com.d102.file.service;

import com.d102.file.dto.UploadDto;

public interface UploadService {

    UploadDto.ImageResponse uploadProfileImage(UploadDto.ImageRequest imageRequestDto);

}
