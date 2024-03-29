package com.d102.api.service;

import com.d102.api.dto.CommonKeywordDto;
import com.d102.api.dto.CommonQuestionDto;
import com.d102.api.dto.CommonScriptDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface CommonQuestionService {

    Page<CommonQuestionDto.ListResponse> getList(Pageable pageable);

    CommonQuestionDto.Response get(Long commonQuestionId);

    CommonScriptDto.Response writeScript(Long commonQuestionId, CommonScriptDto.Request requestDto);

    List<CommonKeywordDto.Response> createKeyword(Long commonQuestionId, CommonKeywordDto.Request requestDto);

    List<CommonKeywordDto.Response> updateKeyword(Long commonKeywordId, CommonKeywordDto.Request requestDto);

    void deleteKeyword(Long commonKeywordId);

}
