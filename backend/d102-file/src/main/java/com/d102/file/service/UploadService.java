package com.d102.file.service;

import com.d102.file.dto.UploadDto;
import org.springframework.web.multipart.MultipartFile;

public interface UploadService {

    UploadDto.ProfileResponse uploadProfile(UploadDto.ProfileRequest profileRequestDto);

    UploadDto.ResumeResponse uploadResume(UploadDto.ResumeRequest resumeRequestDto);

    void uploadAndAnalyzeVideo(UploadDto.AnalysisRequest analysisRequestDto, MultipartFile video);

}
