package com.d102.api.service.impl;

import com.d102.common.constant.TaskConstant;
import com.d102.common.exception.custom.InvalidException;
import com.d102.api.repository.redis.AnalysisHashRepository;
import com.d102.common.repository.redis.TempAnalysisHashRepository;
import com.d102.api.service.TaskService;
import com.d102.common.exception.ExceptionType;
import com.d102.common.repository.redis.QuestionListHashRepository;
import com.d102.common.response.Response;
import com.d102.common.util.SecurityHelper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

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
