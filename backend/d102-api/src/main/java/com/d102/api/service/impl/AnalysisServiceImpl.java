package com.d102.api.service.impl;

import com.d102.api.dto.AnalysisDto;
import com.d102.api.mapper.AnalysisMapper;
import com.d102.api.service.AnalysisService;
import com.d102.common.constant.InterviewType;
import com.d102.common.repository.jpa.InterviewRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Service
public class AnalysisServiceImpl implements AnalysisService {

    private final InterviewRepository interviewRepository;
    private final AnalysisMapper analysisMapper;

    @Transactional(readOnly = true)
    public Page<AnalysisDto.ListResponse> getList(String type, Pageable pageable) {
        return interviewRepository.
                findByType(InterviewType.valueOf(type), pageable).map(analysisMapper::toAnalysisListResponseDto);
    }

}
