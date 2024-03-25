package com.d102.file.mapper;

import com.d102.common.domain.Resume;
import com.d102.common.dto.ResumeDto;
import com.d102.file.dto.UploadDto;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface UploadMapper {

    ResumeDto.Response toResumeResponseDto(Resume resume);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "user", ignore = true)
    @Mapping(target = "filePath", ignore = true)
    Resume toResume(UploadDto.ResumeRequest resumeRequest);

}
