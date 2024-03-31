package com.d102.file.mapper;

import com.d102.common.domain.jpa.Analysis;
import com.d102.common.domain.jpa.Resume;
import com.d102.common.domain.jpa.User;
import com.d102.file.dto.UploadDto;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface UploadMapper {

    @Mapping(source = "profileImageUrl", target = "url")
    UploadDto.ProfileResponse toProfileResponseDto(User user);

    UploadDto.ResumeResponse toResumeResponseDto(Resume resume);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "user", ignore = true)
    @Mapping(target = "fileName", ignore = true)
    @Mapping(target = "filePath", ignore = true)
    @Mapping(target = "resumeQuestions", ignore = true)
    Resume toResume(UploadDto.ResumeRequest resumeRequest);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "interview", ignore = true)
    @Mapping(target = "videoPath", ignore = true)
    @Mapping(target = "thumbnailPath", ignore = true)
    @Mapping(target = "keywordList", ignore = true)
    @Mapping(target = "analysisReqTime", ignore = true)
    @Mapping(target = "analysisStartTime", ignore = true)
    @Mapping(target = "analysisEndTime", ignore = true)
    @Mapping(target = "videoLength", ignore = true)
    @Mapping(target = "fps", ignore = true)
    @Mapping(target = "frames", ignore = true)
    @Mapping(target = "emotion", ignore = true)
    @Mapping(target = "intent", ignore = true)
    Analysis toAnalysis(UploadDto.AnalysisRequest analysisRequest);

}
