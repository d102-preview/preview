package com.d102.api.mapper;

import com.d102.api.dto.AnalysisDto;
import com.d102.common.domain.jpa.Analysis;
import com.d102.common.domain.jpa.Interview;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface AnalysisMapper {

    AnalysisDto.ListResponse.Analysis toAnalysisListResponseDto(Analysis analysis);
    AnalysisDto.ListResponse toAnalysisListResponseDto(Interview interview);


}
