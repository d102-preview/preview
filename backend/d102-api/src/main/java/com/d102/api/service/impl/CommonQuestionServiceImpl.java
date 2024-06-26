package com.d102.api.service.impl;

import com.d102.api.domain.jpa.CommonKeyword;
import com.d102.api.domain.jpa.CommonQuestion;
import com.d102.api.domain.jpa.CommonScript;
import com.d102.api.dto.CommonKeywordDto;
import com.d102.api.dto.CommonQuestionDto;
import com.d102.api.dto.CommonScriptDto;
import com.d102.api.mapper.CommonQuestionMapper;
import com.d102.api.repository.jpa.CommonKeywordRepository;
import com.d102.api.repository.jpa.CommonQuestionRepository;
import com.d102.api.repository.jpa.CommonScriptRepository;
import com.d102.api.service.CommonQuestionService;
import com.d102.common.domain.jpa.User;
import com.d102.common.exception.ExceptionType;
import com.d102.common.exception.custom.NotFoundException;
import com.d102.common.repository.jpa.UserRepository;
import com.d102.common.util.SecurityHelper;
import com.d102.common.util.UserVerifier;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@RequiredArgsConstructor
@Service
public class CommonQuestionServiceImpl implements CommonQuestionService {

    private final UserRepository userRepository;
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
                .script(commonQuestionMapper.toCommonScriptDto(commonScriptRepository.findByUser_EmailAndCommonQuestion_Id(
                        securityHelper.getLoginUsername(), commonQuestionId).orElse(null)))
                .keywordList(commonQuestionMapper.toCommonKeywordDto(commonKeywordRepository.findByUser_EmailAndCommonQuestion_Id(
                        securityHelper.getLoginUsername(), commonQuestionId)))
                .build();
    }

    @Transactional
    public CommonScriptDto.Response writeScript(Long commonQuestionId, CommonScriptDto.Request requestDto) {
        User user = getUser(securityHelper.getLoginUsername());
        CommonQuestion commonQuestion = getCommonQuestion(commonQuestionId);
        CommonScript commonScript = commonScriptRepository.findByUser_EmailAndCommonQuestion_Id(securityHelper.getLoginUsername(),
                commonQuestionId).orElse(null);

        if (commonScript == null) {
            commonScriptRepository.save(commonScriptRepository.save(CommonScript.builder()
                    .user(user)
                    .commonQuestion(commonQuestion)
                    .script(requestDto.getScript())
                    .build()));
        } else {
            commonScript.setScript(requestDto.getScript());
        }

        return get(commonQuestionId).getScript();
    }

    @Transactional
    public List<CommonKeywordDto.Response> createKeyword(Long commonQuestionId, CommonKeywordDto.Request requestDto) {
        User user = getUser(securityHelper.getLoginUsername());
        CommonQuestion commonQuestion = getCommonQuestion(commonQuestionId);

        commonKeywordRepository.save(CommonKeyword.builder()
                .user(user)
                .commonQuestion(commonQuestion)
                .keyword(requestDto.getKeyword())
                .build());

        return get(commonQuestionId).getKeywordList();
    }

    @Transactional
    public List<CommonKeywordDto.Response> updateKeyword(Long commonKeywordId, CommonKeywordDto.Request requestDto) {
        CommonKeyword commonKeyword = getCommonKeyword(commonKeywordId);
        UserVerifier.checkLoginUserAndResourceUser(securityHelper.getLoginUsername(), commonKeyword.getUser().getEmail());

        commonKeyword.setKeyword(requestDto.getKeyword());

        return get(commonKeyword.getCommonQuestion().getId()).getKeywordList();
    }

    @Transactional
    public void deleteKeyword(Long commonKeywordId) {
        CommonKeyword commonKeyword = getCommonKeyword(commonKeywordId);
        UserVerifier.checkLoginUserAndResourceUser(securityHelper.getLoginUsername(), commonKeyword.getUser().getEmail());

        commonKeywordRepository.deleteById(commonKeywordId);
    }

    public User getUser(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new NotFoundException(ExceptionType.UserNotFoundException));
    }

    public CommonQuestion getCommonQuestion(Long questionId) {
        return commonQuestionRepository.findById(questionId)
                .orElseThrow(() -> new NotFoundException(ExceptionType.CommonQuestionNotFoundException));
    }

    public CommonKeyword getCommonKeyword(Long commonKeywordId) {
        return commonKeywordRepository.findById(commonKeywordId)
                .orElseThrow(() -> new NotFoundException(ExceptionType.CommonKeywordNotFoundException));
    }

}
