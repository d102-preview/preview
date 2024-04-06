package com.d102.api.service;

import com.d102.common.response.Response;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

public interface TaskService {

    String checkQuestionListTask(Long resumeId);

    String checkAnalysisTask(Long resumeId);

}
