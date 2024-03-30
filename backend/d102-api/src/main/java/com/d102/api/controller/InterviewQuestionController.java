package com.d102.api.controller;

import com.d102.api.controller.docs.InterviewControllerDocs;
import com.d102.api.service.InterviewService;
import com.d102.common.constant.InterviewConstant;
import com.d102.common.response.Response;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("/interview")
@RequiredArgsConstructor
@RestController
public class InterviewQuestionController implements InterviewControllerDocs {

    private final InterviewService interviewService;

    @GetMapping("/{resumeId}")
    public Response getList(@PathVariable Long resumeId) {
        return new Response(InterviewConstant.QUESTION_LIST, interviewService.getList(resumeId));
    }

}
