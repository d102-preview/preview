package com.d102.file.mapper;

import com.d102.common.domain.Resume;
import com.d102.common.domain.User;
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
    @Mapping(target = "name", ignore = true)
    @Mapping(target = "filePath", ignore = true)
    Resume toResume(UploadDto.ResumeRequest resumeRequest);

}
