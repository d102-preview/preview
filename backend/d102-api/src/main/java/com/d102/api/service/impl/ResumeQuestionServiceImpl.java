package com.d102.api.service.impl;

import com.d102.api.dto.ResumeKeywordDto;
import com.d102.api.dto.ResumeQuestionDto;
import com.d102.api.dto.ResumeScriptDto;
import com.d102.api.mapper.ResumeQuestionMapper;
import com.d102.api.repository.jpa.ResumeKeywordRepository;
import com.d102.api.repository.jpa.ResumeScriptRepository;
import com.d102.api.service.ResumeQuestionService;
import com.d102.common.domain.jpa.*;
import com.d102.common.exception.ExceptionType;
import com.d102.common.exception.custom.NotFoundException;
import com.d102.common.repository.jpa.ResumeQuestionRepository;
import com.d102.common.repository.jpa.ResumeRepository;
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
public class ResumeQuestionServiceImpl implements ResumeQuestionService {

    private final UserRepository userRepository;
    private final ResumeRepository resumeRepository;
    private final ResumeQuestionRepository resumeQuestionRepository;
    private final ResumeScriptRepository resumeScriptRepository;
    private final ResumeKeywordRepository resumeKeywordRepository;
    private final ResumeQuestionMapper resumeQuestionMapper;
    private final SecurityHelper securityHelper;

    @Transactional(readOnly = true)
    public Page<ResumeQuestionDto.ListResponse> getList(Long resumeId, Pageable pageable) {
        Resume resume = getResume(resumeId);
        UserVerifier.checkLoginUserAndResourceUser(securityHelper.getLoginUsername(), resume.getUser().getEmail());

        return resumeQuestionRepository.findByResume_Id(resumeId, pageable).map(resumeQuestionMapper::toResumeQuestionListResponseDto);
    }

    @Transactional(readOnly = true)
    public ResumeQuestionDto.Response get(Long resumeQuestionId) {
        ResumeQuestion resumeQuestion = getResumeQuestionAndCheckUser(resumeQuestionId);

        return resumeQuestionMapper.toResumeQuestionDto(resumeQuestion);
    }

    @Transactional
    public void deleteResumeQuestion(Long resumeQuestionId) {
        ResumeQuestion resumeQuestion = getResumeQuestionAndCheckUser(resumeQuestionId);

        resumeQuestionRepository.deleteById(resumeQuestion.getId());
    }

    @Transactional
    public ResumeScriptDto.Response writeScript(Long resumeQuestionId, ResumeScriptDto.Request requestDto) {
        ResumeQuestion resumeQuestion = getResumeQuestionAndCheckUser(resumeQuestionId);

        if (resumeQuestion.getResumeScript() == null) {
            resumeQuestion.setResumeScript(resumeScriptRepository.saveAndFlush(ResumeScript.builder()
                    .user(getUser(securityHelper.getLoginUsername()))
                    .resumeQuestion(resumeQuestion)
                    .script(requestDto.getScript())
                    .build()));
        } else {
            resumeQuestion.getResumeScript().setScript(requestDto.getScript());
        }

        return resumeQuestionMapper.toResumeQuestionDto(resumeQuestion).getScript();
    }

    @Transactional
    public List<ResumeKeywordDto.Response> createKeyword(Long resumeQuestionId, ResumeKeywordDto.Request requestDto) {
        ResumeQuestion resumeQuestion = getResumeQuestionAndCheckUser(resumeQuestionId);

        resumeKeywordRepository.saveAndFlush(ResumeKeyword.builder()
                .resumeQuestion(resumeQuestion)
                .keyword(requestDto.getKeyword())
                .build());

        return get(resumeQuestionId).getKeywordList();
    }

    @Transactional
    public List<ResumeKeywordDto.Response> updateKeyword(Long resumeKeywordId, ResumeKeywordDto.Request requestDto) {
        ResumeKeyword resumeKeyword = getResumeKeywordAndCheckUser(resumeKeywordId);

        resumeKeyword.setKeyword(requestDto.getKeyword());

        return get(resumeKeyword.getResumeQuestion().getId()).getKeywordList();
    }

    @Transactional
    public void deleteKeyword(Long resumeKeywordId) {
        getResumeKeywordAndCheckUser(resumeKeywordId);

        resumeKeywordRepository.deleteById(resumeKeywordId);
    }

    private User getUser(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new NotFoundException(ExceptionType.UserNotFoundException));
    }

    private ResumeKeyword getResumeKeywordAndCheckUser(Long resumeKeywordId) {
        ResumeKeyword resumeKeyword = resumeKeywordRepository.findById(resumeKeywordId)
                .orElseThrow(() -> new NotFoundException(ExceptionType.ResumeKeywordNotFoundException));
        UserVerifier.checkLoginUserAndResourceUser(securityHelper.getLoginUsername(),
                resumeKeyword.getResumeQuestion().getResume().getUser().getEmail());
        return resumeKeyword;
    }

    private ResumeQuestion getResumeQuestionAndCheckUser(Long resumeQuestionId) {
        ResumeQuestion resumeQuestion = resumeQuestionRepository.findById(resumeQuestionId)
                .orElseThrow(() -> new NotFoundException(ExceptionType.ResumeQuestionNotFoundException));
        UserVerifier.checkLoginUserAndResourceUser(securityHelper.getLoginUsername(), resumeQuestion.getResume().getUser().getEmail());

        return resumeQuestion;
    }

    private Resume getResume(Long resumeId) {
        return resumeRepository.findById(resumeId)
                .orElseThrow(() -> new NotFoundException(ExceptionType.ResumeNotFoundException));
    }

}
