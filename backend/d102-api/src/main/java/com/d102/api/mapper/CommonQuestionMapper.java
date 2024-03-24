package com.d102.api.mapper;

import com.d102.api.domain.CommonQuestion;
import com.d102.api.dto.CommonQuestionDto;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface CommonQuestionMapper {

    CommonQuestionDto.Response toCommonQuestionResponseDto(CommonQuestion commonQuestion);

}

