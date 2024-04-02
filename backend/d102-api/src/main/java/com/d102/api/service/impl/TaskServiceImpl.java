package com.d102.api.service.impl;

import com.d102.api.repository.redis.AnalysisHashRepository;
import com.d102.common.repository.redis.TempAnalysisHashRepository;
import com.d102.api.service.TaskService;
import com.d102.common.constant.RedisConstant;
import com.d102.common.exception.ExceptionType;
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
    private final TempAnalysisHashRepository tempAnalysisHashRepository;

    public String checkQuestionListTask(Long resumeId) {
        return questionListHashRepository.findById(String.valueOf(resumeId)).orElse(null).getStatus();
    }

    public String checkAnalysisTask(Long analysisId) {
        return analysisHashRepository.findById(String.valueOf(analysisId)).orElse(null).getStatus();
    }

}
