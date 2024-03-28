package com.d102.api.service.impl;

import com.d102.api.dto.ResumeQuestionDto;
import com.d102.api.mapper.ResumeQuestionMapper;
import com.d102.api.service.ResumeQuestionService;
import com.d102.common.domain.jpa.Resume;
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

    public Resume getResume(Long resumeId) {
        return resumeRepository.findById(resumeId)
                .orElseThrow(() -> new NotFoundException(ExceptionType.ResumeNotFoundException));
    }

}
