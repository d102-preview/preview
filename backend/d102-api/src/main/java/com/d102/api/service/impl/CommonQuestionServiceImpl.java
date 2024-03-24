package com.d102.api.service.impl;

import com.d102.api.dto.CommonQuestionDto;
import com.d102.api.mapper.CommonQuestionMapper;
import com.d102.api.repository.CommonQuestionRepository;
import com.d102.api.service.CommonQuestionService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class CommonQuestionServiceImpl implements CommonQuestionService {

    private final CommonQuestionRepository commonQuestionRepository;
    private final CommonQuestionMapper commonQuestionMapper;

    @Override
    public Page<CommonQuestionDto.Response> getList(Pageable pageable) {
        return commonQuestionRepository.findAll(pageable).map(commonQuestionMapper::toCommonQuestionResponseDto);
    }

}
