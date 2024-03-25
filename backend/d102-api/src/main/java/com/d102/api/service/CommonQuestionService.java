package com.d102.api.service;

import com.d102.api.dto.CommonKeywordDto;
import com.d102.api.dto.CommonQuestionDto;
import com.d102.api.dto.CommonScriptDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface CommonQuestionService {

    Page<CommonQuestionDto.ListResponse> getList(Pageable pageable);

    CommonQuestionDto.Response get(Long commonQuestionId);

    void writeScript(Long commonQuestionId, CommonScriptDto.Request requestDto);

    void createKeyword(Long commonQuestionId, CommonKeywordDto.Request requestDto);

    void updateKeyword(Long commonKeywordId, CommonKeywordDto.Request requestDto);

    void deleteKeyword(Long commonKeywordId);

}
