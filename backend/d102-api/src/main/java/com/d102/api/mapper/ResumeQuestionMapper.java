package com.d102.api.mapper;

import com.d102.api.dto.ResumeKeywordDto;
import com.d102.api.dto.ResumeQuestionDto;
import com.d102.api.dto.ResumeScriptDto;
import com.d102.common.domain.jpa.ResumeKeyword;
import com.d102.common.domain.jpa.ResumeQuestion;
import com.d102.common.domain.jpa.ResumeScript;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface ResumeQuestionMapper {

    @Mapping(source="resumeScript", target = "script")
    @Mapping(source="resumeKeywordList", target = "keywordList")
    ResumeQuestionDto.Response toResumeQuestionDto(ResumeQuestion resumeQuestion);

    ResumeScriptDto.Response toResumeScriptDto(ResumeScript resumeScript);
    ResumeKeywordDto.Response toResumeKeywordDto(ResumeKeyword resumeKeyword);
    ResumeQuestionDto.ListResponse toResumeQuestionListResponseDto(ResumeQuestion resumeQuestion);

}

