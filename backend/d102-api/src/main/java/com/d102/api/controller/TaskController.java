package com.d102.api.controller;

import com.d102.api.controller.docs.TaskControllerDocs;
import com.d102.api.service.TaskService;
import com.d102.common.constant.TaskConstant;
import com.d102.common.response.Response;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("/task")
@RequiredArgsConstructor
@RestController
public class TaskController implements TaskControllerDocs {

    private final TaskService taskService;

    @GetMapping("/question-list")
    public Response checkQuestionListTask(@RequestParam("id") Long resumeId) {
        return new Response(TaskConstant.TASK_AVAILABLE, taskService.checkQuestionListTask(resumeId));
    }

}
