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
import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.swagger.v3.core.util.Json;
import lombok.RequiredArgsConstructor;
import org.aspectj.weaver.ast.Not;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
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

    /**
     * TODO: try catch를 활용해서 커스텀 예외를 throw하는 것과 throws Exception을 사용하는 것 중 어떤 것이 더 좋은지 논의 필요
     */
    @Transactional(readOnly = true)
    public AnalysisDto.DetailResponse get(Long analysisId) throws Exception {
        /**
         * TODO: 이 부분에서 유저 이메일 검증을 해야하는지 논의 필요
         */
        Analysis analysis = analysisRepository.findById(analysisId).orElseThrow(() -> new NotFoundException(ExceptionType.AnalysisNotFoundException));
        ObjectMapper objectMapper = new ObjectMapper();

        AnalysisDto.EmotionResponse emotionMap = objectMapper.readValue(analysis.getEmotion(), new TypeReference<>(){});
        List<AnalysisDto.IntentResponse> intentList = objectMapper.readValue(analysis.getIntent(), new TypeReference<>(){});

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
                .intentList(intentList)
                .build();
    }

}
