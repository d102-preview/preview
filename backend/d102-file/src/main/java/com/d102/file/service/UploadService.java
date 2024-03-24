package com.d102.file.service;

import com.d102.common.dto.ResumeDto;
import com.d102.file.dto.UploadDto;

import java.io.IOException;

public interface UploadService {

    UploadDto.ProfileResponse uploadProfile(UploadDto.ProfileRequest profileRequestDto);

    ResumeDto.Response uploadResume(UploadDto.ResumeRequest resumeRequestDto);

}
