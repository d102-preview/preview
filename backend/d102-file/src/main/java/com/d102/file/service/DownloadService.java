package com.d102.file.service;

import com.d102.file.dto.DownloadDto;

import java.nio.file.Path;

public interface DownloadService {

    DownloadDto.ProfileResponse downloadProfile(Path profilePath);

    DownloadDto.ResumeResponse downloadResume(Long resumeId);

    DownloadDto.ThumbnailResponse downloadThumbnail(Path thumbnailPath);

}
