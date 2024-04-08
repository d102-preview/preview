package com.d102.file.service;

import com.d102.common.response.Response;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

public interface SseService {

    SseEmitter connectSseV1();

    SseEmitter connectSseV2(String email);

    void sendNotification(String email, Response response);

}
