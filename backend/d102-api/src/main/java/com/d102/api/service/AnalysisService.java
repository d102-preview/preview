package com.d102.api.service;

import com.d102.api.dto.AnalysisDto;
import com.d102.common.constant.InterviewType;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface AnalysisService {

    Page<AnalysisDto.ListResponse> getList(String type, Pageable pageable);

    AnalysisDto.DetailResponse get(Long analysisId);

}
