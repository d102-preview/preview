package com.d102.api.service.impl;

import com.d102.api.domain.jpa.CommonQuestion;
import com.d102.api.dto.InterviewDto;
import com.d102.api.mapper.InterviewMapper;
import com.d102.api.repository.jpa.CommonKeywordRepository;
import com.d102.api.repository.jpa.ResumeKeywordRepository;
import com.d102.api.repository.querydsl.InterviewQuestionRepository;
import com.d102.api.service.InterviewService;
import com.d102.common.constant.InterviewConstant;
import com.d102.common.constant.QuestionType;
import com.d102.common.domain.jpa.Interview;
import com.d102.common.domain.jpa.Resume;
import com.d102.common.domain.jpa.ResumeQuestion;
import com.d102.common.domain.jpa.User;
import com.d102.common.exception.ExceptionType;
import com.d102.common.exception.custom.NotFoundException;
import com.d102.common.repository.jpa.InterviewRepository;
import com.d102.common.repository.jpa.ResumeRepository;
import com.d102.common.repository.jpa.UserRepository;
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
    private final InterviewQuestionRepository interviewQuestionRepository;
    private final ResumeRepository resumeRepository;
    private final CommonKeywordRepository commonKeywordRepository;
    private final ResumeKeywordRepository resumeKeywordRepository;
    private final UserRepository userRepository;
    private final InterviewMapper interviewMapper;
    private final SecurityHelper securityHelper;

    public InterviewDto.Response create(InterviewDto.Request request) {
        /**
         * TODO: Mapper가 string을 enum으로 자동으로 바꿔주는 것 같은데 추후 확인 필요
         */
        Interview interview = interviewMapper.toInterview(request);
        User user = userRepository.findByEmail(securityHelper.getLoginUsername())
                .orElseThrow(() -> new NotFoundException(ExceptionType.UserNotFoundException));
        interview.setUser(user);

        return interviewMapper.toResponse(interviewRepository.saveAndFlush(interview));
    }

    public List<InterviewDto.ListResponse> getList(Long resumeId) {
        checkExistedResumeAndCheckUser(resumeId);

        List<InterviewDto.ListResponse> questionList = new ArrayList<>();

        /* self introduce question */
        questionList.add(InterviewDto.ListResponse.builder()
                .question(InterviewConstant.SELF_INTRODUCE_QUESTION)
                .type(QuestionType.common)
                .keywordList(interviewMapper.toCommonKeywordDto(commonKeywordRepository.findByUser_EmailAndCommonQuestion_Id(
                        securityHelper.getLoginUsername(), InterviewConstant.SELF_INTRODUCE_NO
                )))
                .build());

        /* common question */
        List<CommonQuestion> randomCommonQuestionList = interviewQuestionRepository.getRandomCommonQuestionList();
        for(CommonQuestion commonQuestion: randomCommonQuestionList) {
            questionList.add(InterviewDto.ListResponse.builder()
                    .question(commonQuestion.getQuestion())
                    .type(QuestionType.common)
                    .keywordList(interviewMapper.toCommonKeywordDto(commonKeywordRepository.findByUser_EmailAndCommonQuestion_Id(
                            securityHelper.getLoginUsername(), commonQuestion.getId()
                    )))
                    .build());
        }

        /* resume question */
        List<ResumeQuestion> resumeQuestionList = interviewQuestionRepository.getResumeQuestionList(resumeId);
        for (ResumeQuestion resumeQuestion : resumeQuestionList) {
            questionList.add(InterviewDto.ListResponse.builder()
                    .question(resumeQuestion.getQuestion())
                    .type(QuestionType.resume)
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
