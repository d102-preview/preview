package com.d102.file.service;

import com.d102.file.dto.DownloadDto;

import java.nio.file.Path;

public interface DownloadService {

    DownloadDto.ProfileResponse downloadProfile(Path profileUrl);

    DownloadDto.ResumeResponse downloadResume(Long resumeId);

}
