package com.d102.api.service;

import com.d102.api.dto.CommonKeywordDto;
import com.d102.api.dto.CommonQuestionDto;
import com.d102.api.dto.CommonScriptDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface CommonQuestionService {

    Page<CommonQuestionDto.ListResponse> getList(Pageable pageable);

    CommonQuestionDto.Response get(Long commonQuestionId);

    void writeScript(Long commonQuestionId, CommonScriptDto.Request request);

    void createKeyword(Long commonQuestionId, CommonKeywordDto.Request request);

}
