package com.d102.api.service;

import com.d102.api.dto.ResumeDto;

import java.util.List;

public interface ResumeService {

    List<ResumeDto.ListResponse> getList();

}
