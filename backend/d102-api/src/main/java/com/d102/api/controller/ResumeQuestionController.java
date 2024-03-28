package com.d102.api.controller;

import com.d102.api.controller.docs.ResumeQuestionControllerDocs;
import com.d102.api.dto.ResumeScriptDto;
import com.d102.api.service.ResumeQuestionService;
import com.d102.common.constant.ResumeQuestionConstant;
import com.d102.common.response.Response;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

@RequestMapping("/resume/question")
@RequiredArgsConstructor
@RestController
public class ResumeQuestionController implements ResumeQuestionControllerDocs {

    private final ResumeQuestionService resumeQuestionService;

    @GetMapping("/list/{resumeId}")
    public Response getList(@PathVariable Long resumeId, Pageable pageable) {
        return new Response(ResumeQuestionConstant.RESUME_QUESTION_LIST, resumeQuestionService.getList(resumeId, pageable));
    }

    @GetMapping("/{resumeQuestionId}")
    public Response get(@PathVariable Long resumeQuestionId) {
        return new Response(ResumeQuestionConstant.QUESTION_DETAIL, resumeQuestionService.get(resumeQuestionId));
    }

    @DeleteMapping("/{resumeQuestionId}")
    public Response deleteResumeQuestion(@PathVariable Long resumeQuestionId) {
        resumeQuestionService.deleteResumeQuestion(resumeQuestionId);
        return new Response();
    }

    @PostMapping("/script/{resumeQuestionId}")
    public Response writeScript(@PathVariable Long resumeQuestionId, @RequestBody ResumeScriptDto.Request request) {
        return new Response(ResumeQuestionConstant.QUESTION_DETAIL, resumeQuestionService.writeScript(resumeQuestionId, request));
    }

}
