package com.d102.api.controller;

import com.d102.api.controller.docs.TaskControllerDocs;
import com.d102.api.service.TaskService;
import com.d102.common.constant.TaskConstant;
import com.d102.common.response.Response;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RequestMapping("/task")
@RequiredArgsConstructor
@RestController
public class TaskController implements TaskControllerDocs {

    private final TaskService taskService;

    @GetMapping("/question/list/{resumeId}")
    public Response checkQuestionListTask(@PathVariable("resumeId") Long resumeId) {
        return new Response(TaskConstant.TASK_AVAILABLE, taskService.checkQuestionListTask(resumeId));
    }

}
