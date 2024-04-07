package com.d102.file.service.impl;

import com.d102.common.constant.TaskConstant;
import com.d102.common.exception.ExceptionType;
import com.d102.common.exception.custom.InvalidException;
import com.d102.common.response.Response;
import com.d102.common.util.SecurityHelper;
import com.d102.file.service.SseService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Slf4j
@RequiredArgsConstructor
@Service
public class SseServiceImpl implements SseService {

    public static final Map<String, SseEmitter> sseEmitterMap = new ConcurrentHashMap<>();
    private final SecurityHelper securityHelper;

    public SseEmitter connectSseV1() {
        SseEmitter sseEmitter = new SseEmitter(TaskConstant.SSE_TIMEOUT);
        try {
            Response response = new Response(TaskConstant.STATUS, TaskConstant.STATUS_SUCCESS);
            sseEmitter.send(SseEmitter.event().name(TaskConstant.SSE_EVENT).data(response));
        } catch (Exception e) {
            throw new InvalidException(ExceptionType.SseConnectException);
        }
        sseEmitterMap.put(securityHelper.getLoginUsername(), sseEmitter);
        sseEmitter.onCompletion(() -> sseEmitterMap.remove(securityHelper.getLoginUsername()));
        sseEmitter.onTimeout(() -> sseEmitterMap.remove(securityHelper.getLoginUsername()));
        sseEmitter.onError((e) -> sseEmitterMap.remove(securityHelper.getLoginUsername()));
        return sseEmitter;
    }

    public SseEmitter connectSseV2(String email) {
        SseEmitter sseEmitter = new SseEmitter(Long.MAX_VALUE);
        try {
            Response response = new Response(TaskConstant.STATUS, TaskConstant.STATUS_SUCCESS);
            sseEmitter.send(SseEmitter.event().name(TaskConstant.SSE_EVENT).data(response));
        } catch (Exception e) {
            throw new InvalidException(ExceptionType.SseConnectException);
        }
        sseEmitterMap.put(email, sseEmitter);
        sseEmitter.onCompletion(() -> sseEmitterMap.remove(email));
        sseEmitter.onTimeout(() -> sseEmitterMap.remove(email));
        sseEmitter.onError((e) -> sseEmitterMap.remove(email));
        return sseEmitter;
    }

    public void sendNotification(String email, Response response) {
        log.info("=========================== Service Notification Before =============================");
        log.info("sendNotification email: {}, response: {}", email, response);
        SseEmitter sseEmitter = sseEmitterMap.get(email);
        log.info("sendNotification sseEmitter: {}", sseEmitter);
        /**
         * log sseEmitter key-value
         */
        for (Map.Entry<String, SseEmitter> entry : sseEmitterMap.entrySet()) {
            log.info("sendNotification sseEmitterMap key: {}, value: {}", entry.getKey(), entry.getValue());
        }
        if (sseEmitter != null) {
            try {
                log.info("sendNotification sseEmitter send: {}", response);
                sseEmitter.send(SseEmitter.event().name(TaskConstant.SSE_EVENT).data(response));
            } catch (Exception e) {
                log.error("sendNotification sseEmitter send error: {}", e);
                throw new InvalidException(ExceptionType.SseSendException);
            }
        }
        log.info("=========================== Service Notification After =============================");
    }

}
