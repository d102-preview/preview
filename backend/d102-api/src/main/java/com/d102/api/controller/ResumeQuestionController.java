package com.d102.api.controller;

import com.d102.api.controller.docs.ResumeQuestionControllerDocs;
import com.d102.api.service.ResumeQuestionService;
import com.d102.common.constant.ResumeQuestionConstant;
import com.d102.common.response.Response;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("/resume/question")
@RequiredArgsConstructor
@RestController
public class ResumeQuestionController implements ResumeQuestionControllerDocs {

    private final ResumeQuestionService resumeQuestionService;

    @GetMapping("/list/{resumeId}")
    public Response getList(@PathVariable Long resumeId, Pageable pageable) {
        return new Response(ResumeQuestionConstant.RESUME_QUESTION_LIST, resumeQuestionService.getList(resumeId, pageable));
    }

}
