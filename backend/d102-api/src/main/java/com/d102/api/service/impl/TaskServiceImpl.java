package com.d102.api.service.impl;

import com.d102.api.service.TaskService;
import com.d102.common.repository.redis.QuestionListHashRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class TaskServiceImpl implements TaskService {

    private final QuestionListHashRepository questionListHashRepository;

    public Boolean checkQuestionListTask(Long resumeId) {
        return questionListHashRepository.findById(resumeId).isEmpty();
    }

}
