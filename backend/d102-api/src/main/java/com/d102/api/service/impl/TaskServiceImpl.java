package com.d102.api.service.impl;

import com.d102.api.repository.redis.AnalysisHashRepository;
import com.d102.api.service.TaskService;
import com.d102.common.constant.RedisConstant;
import com.d102.common.exception.ExceptionType;
import com.d102.common.exception.custom.InvalidException;
import com.d102.common.exception.custom.NotFoundException;
import com.d102.common.repository.redis.QuestionListHashRepository;
import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class TaskServiceImpl implements TaskService {

    private final QuestionListHashRepository questionListHashRepository;
    private final AnalysisHashRepository analysisHashRepository;

    public Boolean checkQuestionListTask(Long resumeId) {
        String status =  questionListHashRepository.findById(resumeId).orElse(null).getStatus();
        if (StringUtils.equals(status, RedisConstant.STATUS_FAIL)) {
            throw new NotFoundException(ExceptionType.TaskNotFoundException);
        }
        /**
         * STATUS_PROCESS일 경우 처리중이므로 false 반환
         * STATUS_SUCCESS일 경우 처리 완료이므로 true 반환
         * STATUS_FAIL일 경우 처리 실패이므로 NotFoundException 발생
         */
        return StringUtils.equals(status, RedisConstant.STATUS_SUCCESS);
    }

    public Boolean checkAnalysisTask(Long analysisId) {
        String status =  analysisHashRepository.findById(analysisId).orElse(null).getStatus();
        if (StringUtils.equals(status, RedisConstant.STATUS_FAIL)) {
            throw new NotFoundException(ExceptionType.TaskNotFoundException);
        }
        return StringUtils.equals(status, RedisConstant.STATUS_SUCCESS);
    }

}
