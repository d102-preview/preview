package com.d102.api.mapper;

import com.d102.api.domain.jpa.CommonKeyword;
import com.d102.api.dto.InterviewDto;
import com.d102.common.domain.jpa.ResumeKeyword;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface InterviewMapper {

    InterviewDto.KeywordResponse toCommonKeywordDto(CommonKeyword commonKeyword);
    List<InterviewDto.KeywordResponse> toCommonKeywordDto(List<CommonKeyword> commonKeywordList);
    InterviewDto.KeywordResponse toResumeKeywordDto(ResumeKeyword resumeKeyword);
    List<InterviewDto.KeywordResponse> toResumeKeywordDto(List<ResumeKeyword> resumeKeywordList);

}

