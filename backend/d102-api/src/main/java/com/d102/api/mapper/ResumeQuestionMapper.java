package com.d102.api.mapper;

import com.d102.api.dto.ResumeQuestionDto;
import com.d102.common.domain.jpa.ResumeQuestion;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface ResumeQuestionMapper {

    ResumeQuestionDto.ListResponse toResumeQuestionListResponseDto(ResumeQuestion resumeQuestion);

}

