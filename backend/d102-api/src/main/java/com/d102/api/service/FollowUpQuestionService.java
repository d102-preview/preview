package com.d102.api.service;

import com.d102.api.dto.FollowUpQuestionDto;
import com.d102.common.response.Response;

public interface FollowUpQuestionService {

    FollowUpQuestionDto.Response get(FollowUpQuestionDto.Request requestDto);

}
