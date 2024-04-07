package com.d102.api.controller;

import com.d102.api.controller.docs.TaskControllerDocs;
import com.d102.api.service.TaskService;
import com.d102.common.constant.TaskConstant;
import com.d102.common.response.Response;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("/task")
@RequiredArgsConstructor
@RestController
public class TaskController implements TaskControllerDocs {

    private final TaskService taskService;

    @GetMapping("/question/list/{resumeId}")
    public Response checkQuestionListTask(@PathVariable("resumeId") Long resumeId) {
        return new Response(TaskConstant.STATUS, taskService.checkQuestionListTask(resumeId));
    }

    @GetMapping("/analysis/{analysisId}")
    public Response checkAnalysisTask(@PathVariable("analysisId") Long analysisId) {
        return new Response(TaskConstant.STATUS, taskService.checkAnalysisTask(analysisId));
    }

}
