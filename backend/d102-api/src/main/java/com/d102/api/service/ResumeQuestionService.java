package com.d102.api.service;

import com.d102.api.dto.ResumeQuestionDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface ResumeQuestionService {

    Page<ResumeQuestionDto.ListResponse> getList(Long resumeId, Pageable pageable);

}
