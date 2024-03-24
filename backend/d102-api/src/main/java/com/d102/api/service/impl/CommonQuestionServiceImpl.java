package com.d102.api.service.impl;

import com.d102.api.dto.CommonQuestionDto;
import com.d102.api.mapper.CommonQuestionMapper;
import com.d102.api.repository.CommonKeywordRepository;
import com.d102.api.repository.CommonQuestionRepository;
import com.d102.api.repository.CommonScriptRepository;
import com.d102.api.service.CommonQuestionService;
import com.d102.common.util.SecurityHelper;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Service
public class CommonQuestionServiceImpl implements CommonQuestionService {

    private final CommonQuestionRepository commonQuestionRepository;
    private final CommonScriptRepository commonScriptRepository;
    private final CommonKeywordRepository commonKeywordRepository;
    private final CommonQuestionMapper commonQuestionMapper;
    private final SecurityHelper securityHelper;

    @Transactional(readOnly = true)
    public Page<CommonQuestionDto.ListResponse> getList(Pageable pageable) {
        return commonQuestionRepository.findAll(pageable).map(commonQuestionMapper::toCommonQuestionListResponseDto);
    }

    @Transactional(readOnly = true)
    public CommonQuestionDto.Response get(Long commonQuestionId) {
        return CommonQuestionDto.Response.builder()
                .commonScript(commonQuestionMapper.toCommonScriptDto(commonScriptRepository.findByUser_EmailAndCommonQuestion_Id(
                        securityHelper.getLoginUsername(), commonQuestionId).orElse(null)))
                .commonKeywords(commonQuestionMapper.toCommonKeywordDto(commonKeywordRepository.findByUser_EmailAndCommonQuestion_Id(
                        securityHelper.getLoginUsername(), commonQuestionId)))
                .build();
    }

}
