package com.d102.api.service.impl;

import com.d102.api.domain.jpa.CommonQuestion;
import com.d102.api.dto.InterviewDto;
import com.d102.api.mapper.InterviewMapper;
import com.d102.api.repository.jpa.CommonKeywordRepository;
import com.d102.api.repository.jpa.ResumeKeywordRepository;
import com.d102.api.repository.querydsl.InterviewRepository;
import com.d102.api.service.InterviewService;
import com.d102.common.constant.QuestionType;
import com.d102.common.domain.jpa.Resume;
import com.d102.common.domain.jpa.ResumeQuestion;
import com.d102.common.exception.ExceptionType;
import com.d102.common.exception.custom.NotFoundException;
import com.d102.common.repository.jpa.ResumeRepository;
import com.d102.common.util.SecurityHelper;
import com.d102.common.util.UserVerifier;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@RequiredArgsConstructor
@Service
public class InterviewServiceImpl implements InterviewService {

    private final InterviewRepository interviewRepository;
    private final ResumeRepository resumeRepository;
    private final CommonKeywordRepository commonKeywordRepository;
    private final ResumeKeywordRepository resumeKeywordRepository;
    private final InterviewMapper interviewMapper;
    private final SecurityHelper securityHelper;

    @Override
    public List<InterviewDto.ListResponse> getList(Long resumeId) {
        checkExistedResumeAndCheckUser(resumeId);

        List<InterviewDto.ListResponse> questionList = new ArrayList<>();

        // common question
        List<CommonQuestion> randomCommonQuestionList = interviewRepository.getRandomCommonQuestionList();
        for(CommonQuestion commonQuestion: randomCommonQuestionList) {
            questionList.add(InterviewDto.ListResponse.builder()
                    .question(commonQuestion.getQuestion())
                    .type(QuestionType.COMMON)
                    .keywordList(interviewMapper.toCommonKeywordDto(commonKeywordRepository.findByUser_EmailAndCommonQuestion_Id(
                            securityHelper.getLoginUsername(), commonQuestion.getId()
                    )))
                    .build());
        }

        // resume question
        List<ResumeQuestion> resumeQuestionList = interviewRepository.getResumeQuestionList(resumeId);
        for (ResumeQuestion resumeQuestion : resumeQuestionList) {
            questionList.add(InterviewDto.ListResponse.builder()
                    .question(resumeQuestion.getQuestion())
                    .type(QuestionType.RESUME)
                    .keywordList(interviewMapper.toResumeKeywordDto(resumeKeywordRepository.findByResumeQuestion_id(resumeQuestion.getId())))
                    .build());
        }

        return questionList;
    }

    private void checkExistedResumeAndCheckUser(Long resumeId) {
        Resume resume = resumeRepository.findById(resumeId)
                .orElseThrow(() -> new NotFoundException(ExceptionType.ResumeNotFoundException));
        UserVerifier.checkLoginUserAndResourceUser(securityHelper.getLoginUsername(),
                resume.getUser().getEmail());
    }

}
