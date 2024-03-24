package com.d102.api.service;

import com.d102.api.dto.CommonQuestionDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface CommonQuestionService {

    Page<CommonQuestionDto.Response> getList(Pageable pageable);

}
