package com.d102.api.controller;

import com.d102.api.controller.docs.TaskControllerDocs;
import com.d102.api.service.TaskService;
import com.d102.common.constant.TaskConstant;
import com.d102.common.response.Response;
import com.d102.common.service.SseService;
import com.d102.common.util.SecurityHelper;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

@RequestMapping("/task")
@RequiredArgsConstructor
@RestController
public class TaskController implements TaskControllerDocs {

    private final TaskService taskService;
    private final SseService sseService;
    private final SecurityHelper securityHelper;

    @GetMapping("/question/list/{resumeId}")
    public Response checkQuestionListTask(@PathVariable("resumeId") Long resumeId) {
        return new Response(TaskConstant.STATUS, taskService.checkQuestionListTask(resumeId));
    }

    @GetMapping("/analysis/{analysisId}")
    public Response checkAnalysisTask(@PathVariable("analysisId") Long analysisId) {
        return new Response(TaskConstant.STATUS, taskService.checkAnalysisTask(analysisId));
    }

    @GetMapping(value = "/sse/v1", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public ResponseEntity<SseEmitter> connectSseV1() {
        return ResponseEntity.ok()
                .header("X-Accel-Buffering", "no")
                .body(sseService.connectSseV1());
    }

    @GetMapping(value = "/sse/v2", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
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
