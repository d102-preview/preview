package com.d102.file.controller;

import com.d102.common.constant.TaskConstant;
import com.d102.common.response.Response;
import com.d102.file.service.SseService;
import com.d102.common.util.SecurityHelper;
import com.d102.file.controller.docs.SseControllerDocs;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

@RequestMapping("/sse")
@RequiredArgsConstructor
@RestController
public class SseController implements SseControllerDocs {

    private final SseService sseService;
    private final SecurityHelper securityHelper;

    @GetMapping(value = "/v1", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public ResponseEntity<SseEmitter> connectSseV1() {
        return ResponseEntity.ok()
                .header("X-Accel-Buffering", "no")
                .body(sseService.connectSseV1());
    }

    @GetMapping(value = "/v2", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public ResponseEntity<SseEmitter> connectSseV2(@RequestParam("email") String email) {
        return ResponseEntity.ok()
                .header("X-Accel-Buffering", "no")
                .body(sseService.connectSseV2(email));
    }

    @GetMapping(value = "/send")
    public Response sendNotification() {
        sseService.sendNotification(securityHelper.getLoginUsername(), new Response(TaskConstant.SSE_TEST, TaskConstant.STATUS_SUCCESS));
        return new Response();
    }

}
