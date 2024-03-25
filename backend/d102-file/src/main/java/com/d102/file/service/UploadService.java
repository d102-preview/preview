package com.d102.file.service;

import com.d102.file.dto.UploadDto;

public interface UploadService {

    UploadDto.ProfileResponse uploadProfile(UploadDto.ProfileRequest profileRequestDto);

    UploadDto.ResumeResponse uploadResume(UploadDto.ResumeRequest resumeRequestDto);

}
