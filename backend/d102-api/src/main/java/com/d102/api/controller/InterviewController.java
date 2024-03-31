package com.d102.api.controller;

import com.d102.api.controller.docs.InterviewControllerDocs;
import com.d102.api.dto.InterviewDto;
import com.d102.api.service.InterviewService;
import com.d102.common.constant.InterviewConstant;
import com.d102.common.response.Response;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RequestMapping("/interview")
@RequiredArgsConstructor
@RestController
public class InterviewController implements InterviewControllerDocs {

    private final InterviewService interviewService;

    @PostMapping
    public Response create(@RequestBody InterviewDto.Request request) {
        return new Response(InterviewConstant.INTERVIEW, interviewService.create(request));
    }

    @GetMapping("/{resumeId}")
    public Response getList(@PathVariable Long resumeId) {
        return new Response(InterviewConstant.QUESTION_LIST, interviewService.getList(resumeId));
    }

}
