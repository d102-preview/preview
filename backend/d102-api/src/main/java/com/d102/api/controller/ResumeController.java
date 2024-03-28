package com.d102.api.controller;

import com.d102.api.controller.docs.ResumeControllerDocs;
import com.d102.api.service.ResumeService;
import com.d102.common.constant.ResumeConstant;
import com.d102.common.response.Response;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("/resume")
@RequiredArgsConstructor
@RestController
public class ResumeController implements ResumeControllerDocs {

    private final ResumeService resumeService;

    @GetMapping("/list")
    public Response getList() {
        return new Response(ResumeConstant.RESUME_LIST, resumeService.getList());
    }

}
