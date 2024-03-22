package com.d102.api.controller;

import com.d102.api.controller.docs.EmailControllerDocs;
import com.d102.api.dto.EmailDto;
import com.d102.api.service.EmailService;
import com.d102.common.response.Response;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RequestMapping("/email")
@RequiredArgsConstructor
@RestController
public class EmailController implements EmailControllerDocs {

    private final EmailService emailService;

    @GetMapping("/email")
    public Response checkAvailableEmail(@RequestParam String email) {
        return new Response("available", emailService.checkAvailableEmail(email));
    }

    @PostMapping("/email")
    public Response sendAuthorizationCode(@RequestBody EmailDto.Request requestDto) {
        emailService.sendAuthorizationCode(requestDto);
        return new Response();
    }

}
