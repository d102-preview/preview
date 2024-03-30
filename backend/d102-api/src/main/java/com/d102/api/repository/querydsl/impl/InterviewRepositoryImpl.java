package com.d102.api.repository.querydsl.impl;

import com.d102.api.domain.jpa.CommonQuestion;
import com.d102.api.domain.jpa.QCommonQuestion;
import com.d102.api.repository.querydsl.InterviewRepository;
import com.d102.common.constant.InterviewConstant;
import com.d102.common.domain.jpa.QResumeQuestion;
import com.d102.common.domain.jpa.ResumeQuestion;
import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@RequiredArgsConstructor
@Repository
public class InterviewRepositoryImpl implements InterviewRepository {

    private final JPAQueryFactory jpaQueryFactory;
    private final QCommonQuestion commonQuestion = QCommonQuestion.commonQuestion;
    private final QResumeQuestion resumeQuestion = QResumeQuestion.resumeQuestion;

    @Transactional(readOnly = true)
    public List<CommonQuestion> getRandomCommonQuestionList() {
        return jpaQueryFactory.selectFrom(commonQuestion)
                .orderBy(makeRandom())
                .limit(InterviewConstant.QUESTION_COUNT)
                .fetch();
    }

    @Override
    public List<ResumeQuestion> getResumeQuestionList(Long resumeId) {
        return jpaQueryFactory.selectFrom(resumeQuestion)
                .where(resumeQuestion.resume.id.eq(resumeId))
                .orderBy(makeRandom())
                .limit(InterviewConstant.QUESTION_COUNT)
                .fetch();
    }

    public static OrderSpecifier<Double> makeRandom() {
        return Expressions.numberTemplate(Double.class, "function('rand')").asc();
    }

}
