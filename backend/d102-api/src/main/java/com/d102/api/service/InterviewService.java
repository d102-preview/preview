package com.d102.api.service;

import com.d102.api.dto.InterviewDto;

import java.util.List;

public interface InterviewService {

    List<InterviewDto.ListResponse> getList(Long resumeId);

}
