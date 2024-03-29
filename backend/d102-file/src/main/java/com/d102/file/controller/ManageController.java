package com.d102.file.controller;

import com.d102.common.response.Response;
import com.d102.file.controller.docs.ManageControllerDocs;
import com.d102.file.service.ManageService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RequestMapping("/manage")
@RequiredArgsConstructor
@RestController
public class ManageController implements ManageControllerDocs {

    private final ManageService manageService;

    @DeleteMapping("/resume/{resumeId}")
    public Response deleteResume(@PathVariable("resumeId") Long resumeId) {
        manageService.deleteResume(resumeId);
        return new Response();
    }

}
