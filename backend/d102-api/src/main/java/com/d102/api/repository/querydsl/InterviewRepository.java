package com.d102.api.repository.querydsl;

import com.d102.api.domain.jpa.CommonQuestion;
import com.d102.common.domain.jpa.ResumeQuestion;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface InterviewRepository {

    List<CommonQuestion> getRandomCommonQuestionList();
    List<ResumeQuestion> getResumeQuestionList(Long resumeId);

}
