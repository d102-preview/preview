package com.d102.api.service.impl;

import com.d102.api.dto.AnalysisDto;
import com.d102.api.mapper.AnalysisMapper;
import com.d102.api.service.AnalysisService;
import com.d102.common.constant.InterviewType;
import com.d102.common.domain.jpa.Analysis;
import com.d102.common.exception.ExceptionType;
import com.d102.common.exception.custom.NotFoundException;
import com.d102.common.repository.jpa.AnalysisRepository;
import com.d102.common.repository.jpa.InterviewRepository;
import com.d102.common.util.SecurityHelper;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.lang.reflect.Type;
import java.util.Map;

@RequiredArgsConstructor
@Service
public class AnalysisServiceImpl implements AnalysisService {

    private final InterviewRepository interviewRepository;
    private final AnalysisRepository analysisRepository;
    private final AnalysisMapper analysisMapper;
    private final SecurityHelper securityHelper;

    @Transactional(readOnly = true)
    public Page<AnalysisDto.ListResponse> getList(String type, Pageable pageable) {
        return interviewRepository.findByTypeAndUser_Email(InterviewType.valueOf(type), securityHelper.getLoginUsername(), pageable).map(analysisMapper::toAnalysisListResponseDto);
    }

    @Transactional(readOnly = true)
    public AnalysisDto.DetailResponse get(Long analysisId) {
        /**
         * TODO: 이 부분에서 유저 이메일 검증을 해야하는지 논의 필요
         */
        Analysis analysis = analysisRepository.findById(analysisId).orElseThrow(() -> new NotFoundException(ExceptionType.AnalysisNotFoundException));
        ObjectMapper objectMapper = new ObjectMapper();
        Map<String, Object> emotionMap = objectMapper.convertValue(analysis.getEmotion(), Map.class);

        return AnalysisDto.DetailResponse.builder()
                .id(analysis.getId())
                .questionType(analysis.getQuestionType())
                .question(analysis.getQuestion())
                .answer(analysis.getAnswer())
                .videoPath(analysis.getVideoPath())
                .thumbnailPath(analysis.getThumbnailPath())
                .keywordList(analysis.getKeywordList())
                .videoLength(analysis.getVideoLength())
                .emotionMap(emotionMap)
                .build();
    }

}
