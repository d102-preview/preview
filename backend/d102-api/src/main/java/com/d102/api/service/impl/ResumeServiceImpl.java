package com.d102.api.service.impl;

import com.d102.api.dto.ResumeDto;
import com.d102.api.mapper.ResumeMapper;
import com.d102.api.service.ResumeService;
import com.d102.common.repository.jpa.ResumeRepository;
import com.d102.common.util.SecurityHelper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@RequiredArgsConstructor
@Service
public class ResumeServiceImpl implements ResumeService {

    private final ResumeRepository resumeRepository;
    private final ResumeMapper resumeMapper;
    private final SecurityHelper securityHelper;

    @Transactional(readOnly = true)
    public List<ResumeDto.ListResponse> getList() {
        return resumeMapper.toResumeListResponseDto(resumeRepository.findByUser_Email(
                securityHelper.getLoginUsername()));
    }

}
