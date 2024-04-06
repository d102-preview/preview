package com.d102.common.service;

import com.d102.common.response.Response;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

public interface TaskService {

    String checkQuestionListTask(Long resumeId);

    String checkAnalysisTask(Long resumeId);

    SseEmitter connectSseV1();

    SseEmitter connectSseV2(String email);

    void sendNotification(String email, Response response);

}
