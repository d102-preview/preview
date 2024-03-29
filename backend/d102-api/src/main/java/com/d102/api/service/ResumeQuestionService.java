package com.d102.api.service;

import com.d102.api.dto.ResumeKeywordDto;
import com.d102.api.dto.ResumeQuestionDto;
import com.d102.api.dto.ResumeScriptDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface ResumeQuestionService {

    Page<ResumeQuestionDto.ListResponse> getList(Long resumeId, Pageable pageable);

    ResumeQuestionDto.Response get(Long resumeQuestionId);

    void deleteResumeQuestion(Long resumeQuestionId);

    ResumeScriptDto.Response writeScript(Long resumeQuestionId, ResumeScriptDto.Request requestDto);

    List<ResumeKeywordDto.Response> createKeyword(Long resumeQuestionId, ResumeKeywordDto.Request requestDto);

    List<ResumeKeywordDto.Response> updateKeyword(Long resumeKeywordId, ResumeKeywordDto.Request requestDto);

    void deleteKeyword(Long resumeKeywordId);

}
