package com.d102.api.repository.querydsl.impl;

import com.d102.api.domain.jpa.CommonQuestion;
import com.d102.api.domain.jpa.QCommonQuestion;
import com.d102.api.repository.querydsl.InterviewQuestionRepository;
import com.d102.common.constant.InterviewConstant;
import com.d102.common.domain.jpa.QResumeQuestion;
import com.d102.common.domain.jpa.ResumeQuestion;
import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@RequiredArgsConstructor
@Repository
public class InterviewQuestionRepositoryImpl implements InterviewQuestionRepository {

    private final JPAQueryFactory jpaQueryFactory;
    private final QCommonQuestion commonQuestion = QCommonQuestion.commonQuestion;
    private final QResumeQuestion resumeQuestion = QResumeQuestion.resumeQuestion;

    @Transactional(readOnly = true)
    public List<CommonQuestion> getRandomCommonQuestionList() {
        return jpaQueryFactory.selectFrom(commonQuestion)
                .where(commonQuestion.id.notIn(exceptSelfIntroduce()))
                .orderBy(makeRandom())
                .limit(InterviewConstant.QUESTION_COUNT)
                .fetch();
    }

    @Transactional(readOnly = true)
    public List<ResumeQuestion> getResumeQuestionList(Long resumeId) {
        return jpaQueryFactory.selectFrom(resumeQuestion)
                .where(resumeQuestion.resume.id.eq(resumeId))
                .orderBy(resumeQuestion.id.asc()) /* to simulate */
//                .orderBy(makeRandom())
                .limit(InterviewConstant.QUESTION_COUNT)
                .fetch();
    }

    private static List<Long> exceptSelfIntroduce() {
        List<Long> selfIntroduceList = new ArrayList<>();
        selfIntroduceList.add(InterviewConstant.SELF_INTRODUCE_NO);
        return selfIntroduceList;
    }

    private static OrderSpecifier<Double> makeRandom() {
        return Expressions.numberTemplate(Double.class, "function('rand')").asc();
    }

}
