package com.d102.api.mapper;

import com.d102.api.domain.CommonKeyword;
import com.d102.api.domain.CommonQuestion;
import com.d102.api.domain.CommonScript;
import com.d102.api.dto.CommonKeywordDto;
import com.d102.api.dto.CommonQuestionDto;
import com.d102.api.dto.CommonScriptDto;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface CommonQuestionMapper {

    CommonScriptDto.Response toCommonScriptDto(CommonScript commonScript);
    CommonKeywordDto.Response toCommonKeywordDto(CommonKeyword commonKeyword);
    List<CommonKeywordDto.Response> toCommonKeywordDto(List<CommonKeyword> commonKeywords);
    CommonQuestionDto.ListResponse toCommonQuestionListResponseDto(CommonQuestion commonQuestion);

}

