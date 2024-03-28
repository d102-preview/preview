package com.d102.api.service.impl;

import com.d102.api.dto.CommonQuestionDto;
import com.d102.api.dto.ResumeQuestionDto;
import com.d102.api.mapper.ResumeQuestionMapper;
import com.d102.api.service.ResumeQuestionService;
import com.d102.common.domain.jpa.Resume;
import com.d102.common.domain.jpa.ResumeQuestion;
import com.d102.common.exception.ExceptionType;
import com.d102.common.exception.custom.NotFoundException;
import com.d102.common.repository.jpa.ResumeQuestionRepository;
import com.d102.common.repository.jpa.ResumeRepository;
import com.d102.common.util.SecurityHelper;
import com.d102.common.util.UserVerifier;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Service
public class ResumeQuestionServiceImpl implements ResumeQuestionService {

    private final ResumeRepository resumeRepository;
    private final ResumeQuestionRepository resumeQuestionRepository;
    private final ResumeQuestionMapper resumeQuestionMapper;
    private final SecurityHelper securityHelper;


    @Transactional(readOnly = true)
    public Page<ResumeQuestionDto.ListResponse> getList(Long resumeId, Pageable pageable) {
        Resume resume = getResume(resumeId);
        UserVerifier.checkLoginUserAndResourceUser(securityHelper.getLoginUsername(), resume.getUser().getEmail());

        return resumeQuestionRepository.findByResume_Id(resumeId, pageable).map(resumeQuestionMapper::toResumeQuestionListResponseDto);
    }

    @Override
    public ResumeQuestionDto.Response get(Long resumeQuestionId) {
        ResumeQuestion resumeQuestion = getResumeQuestion(resumeQuestionId);
        UserVerifier.checkLoginUserAndResourceUser(securityHelper.getLoginUsername(), resumeQuestion.getResume().getUser().getEmail());

        return resumeQuestionMapper.toResumeQuestionDto(resumeQuestion);
    }

    //    @Transactional(readOnly = true)
//    public CommonQuestionDto.Response get(Long commonQuestionId) {
//        return CommonQuestionDto.Response.builder()
//                .script(commonQuestionMapper.toCommonScriptDto(commonScriptRepository.findByUser_EmailAndCommonQuestion_Id(
//                        securityHelper.getLoginUsername(), commonQuestionId).orElse(null)))
//                .keywordList(commonQuestionMapper.toCommonKeywordDto(commonKeywordRepository.findByUser_EmailAndCommonQuestion_Id(
//                        securityHelper.getLoginUsername(), commonQuestionId)))
//                .build();
//    }

    public ResumeQuestion getResumeQuestion(Long resumeQuestionId) {
        return resumeQuestionRepository.findById(resumeQuestionId)
                .orElseThrow(() -> new NotFoundException(ExceptionType.ResumeQuestionNotFoundException));
    }

    public Resume getResume(Long resumeId) {
        return resumeRepository.findById(resumeId)
                .orElseThrow(() -> new NotFoundException(ExceptionType.ResumeNotFoundException));
    }

}
