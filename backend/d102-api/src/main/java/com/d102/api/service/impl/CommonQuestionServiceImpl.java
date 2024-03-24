package com.d102.api.service.impl;

import com.d102.api.domain.CommonKeyword;
import com.d102.api.domain.CommonQuestion;
import com.d102.api.domain.CommonScript;
import com.d102.api.dto.CommonKeywordDto;
import com.d102.api.dto.CommonQuestionDto;
import com.d102.api.dto.CommonScriptDto;
import com.d102.api.mapper.CommonQuestionMapper;
import com.d102.api.repository.CommonKeywordRepository;
import com.d102.api.repository.CommonQuestionRepository;
import com.d102.api.repository.CommonScriptRepository;
import com.d102.api.service.CommonQuestionService;
import com.d102.common.domain.User;
import com.d102.common.exception.ExceptionType;
import com.d102.common.exception.custom.NotFoundException;
import com.d102.common.repository.UserRepository;
import com.d102.common.util.SecurityHelper;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
                .commonScript(commonQuestionMapper.toCommonScriptDto(commonScriptRepository.findByUser_EmailAndCommonQuestion_Id(
                        securityHelper.getLoginUsername(), commonQuestionId).orElse(null)))
                .commonKeywords(commonQuestionMapper.toCommonKeywordDto(commonKeywordRepository.findByUser_EmailAndCommonQuestion_Id(
                        securityHelper.getLoginUsername(), commonQuestionId)))
                .build();
    }

    @Transactional
    public void writeScript(Long commonQuestionId, CommonScriptDto.Request request) {
        User user = getUser(securityHelper.getLoginUsername());
        CommonQuestion commonQuestion = getCommonQuestion(commonQuestionId);
        CommonScript commonScript = commonScriptRepository.findByUser_EmailAndCommonQuestion_Id(securityHelper.getLoginUsername(),
                commonQuestionId).orElse(null);

        if (commonScript == null) {
            commonScriptRepository.save(commonScriptRepository.save(CommonScript.builder()
                    .user(user)
                    .commonQuestion(commonQuestion)
                    .build()));
        } else {
            commonScript.setScript(request.getScript());
        }
    }

    @Transactional
    public void createKeyword(Long commonQuestionId, CommonKeywordDto.Request request) {
        User user = getUser(securityHelper.getLoginUsername());
        CommonQuestion commonQuestion = getCommonQuestion(commonQuestionId);

        commonKeywordRepository.save(CommonKeyword.builder()
                .user(user)
                .commonQuestion(commonQuestion)
                .keyword(request.getKeyword())
                .build());
    }

    @Transactional
    public void updateKeyword(Long commonKeywordId, CommonKeywordDto.Request request) {
        CommonKeyword commonKeyword = getCommonKeyword(commonKeywordId);
        checkLoginUserAndKeywordUser(securityHelper.getLoginUsername(), commonKeyword.getUser().getEmail());

        commonKeyword.setKeyword(request.getKeyword());
    }

    @Transactional
    public void deleteKeyword(Long commonKeywordId) {
        CommonKeyword commonKeyword = getCommonKeyword(commonKeywordId);
        checkLoginUserAndKeywordUser(securityHelper.getLoginUsername(), commonKeyword.getUser().getEmail());

        commonKeywordRepository.deleteById(commonKeywordId);
    }

    private void checkLoginUserAndKeywordUser(String loginEmail, String keywordEmail) {
        if (!loginEmail.equals(keywordEmail)) {
            throw new NotFoundException(ExceptionType.NotVerifyUserException);
        }
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
