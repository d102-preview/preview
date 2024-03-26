package com.d102.file.controller;

import com.d102.common.response.Response;
import com.d102.file.controller.docs.ManageControllerDocs;
import com.d102.file.service.ManageService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("/manage")
@RequiredArgsConstructor
@RestController
public class ManageController implements ManageControllerDocs {

    private final ManageService manageService;

    @DeleteMapping("/resume")
    public Response deleteResume(@RequestParam("id") Long resumeId) {
        manageService.deleteResume(resumeId);
        return new Response();
    }

}
