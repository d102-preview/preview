package com.d102.api.controller;

import com.d102.api.controller.docs.HealthControllerDocs;
import com.d102.common.response.Response;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("/health")
@RestController
public class HealthController implements HealthControllerDocs {

    @GetMapping
    public Response checkHealth() {
        return new Response();
    }

}
