package com.d102.api.mapper;

import com.d102.api.dto.ResumeDto;
import com.d102.common.domain.jpa.Resume;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface ResumeMapper {

    ResumeDto.ListResponse toResumeListResponseDto(Resume resume);
    List<ResumeDto.ListResponse> toResumeListResponseDto(List<Resume> resumeList);

}

