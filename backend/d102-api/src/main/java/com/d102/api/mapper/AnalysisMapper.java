package com.d102.api.mapper;

import com.d102.api.dto.AnalysisDto;
import com.d102.common.domain.jpa.Analysis;
import com.d102.common.domain.jpa.Interview;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface AnalysisMapper {

    AnalysisDto.ListResponse toAnalysisListResponseDto(Interview interview);

    @Mapping(target = "status", source = "analysisStatus")
    @Mapping(target = "startTime", source = "analysisReqTime")
    AnalysisDto.AnalysisResponse toAnalysisListResponseDto(Analysis analysis);

}
