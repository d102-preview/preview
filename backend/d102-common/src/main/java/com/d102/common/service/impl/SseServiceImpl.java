package com.d102.common.service.impl;

import com.d102.common.constant.TaskConstant;
import com.d102.common.exception.ExceptionType;
import com.d102.common.exception.custom.InvalidException;
import com.d102.common.response.Response;
import com.d102.common.service.SseService;
import com.d102.common.util.SecurityHelper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

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
        SseEmitter sseEmitter = sseEmitterMap.get(email);
        if (sseEmitter != null) {
            try {
                sseEmitter.send(SseEmitter.event().name(TaskConstant.SSE_EVENT).data(response));
            } catch (Exception e) {
                throw new InvalidException(ExceptionType.SseSendException);
            }
        }
    }

}
