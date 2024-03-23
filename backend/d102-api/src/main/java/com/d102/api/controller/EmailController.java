package com.d102.api.controller;

import com.d102.api.controller.docs.EmailControllerDocs;
import com.d102.api.dto.EmailDto;
import com.d102.api.service.EmailService;
import com.d102.common.constant.EmailConstant;
import com.d102.common.response.Response;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RequestMapping("/email")
@RequiredArgsConstructor
@RestController
public class EmailController implements EmailControllerDocs {

    private final EmailService emailService;

    @GetMapping
    public Response checkAvailableEmail(@RequestParam String email) {
        return new Response(EmailConstant.EMAIL_AVAILABLE, emailService.checkAvailableEmail(email));
    }

    @PostMapping
    public Response sendAuthorizationCode(@RequestBody EmailDto.Request requestDto) {
        emailService.sendAuthorizationCode(requestDto);
        return new Response();
    }

    @PostMapping("/verify")
    public Response verifyAuthorizationCode(@RequestBody EmailDto.VerifyRequest verifyRequestDto) {
        return new Response(EmailConstant.EMAIL_VERIFY, emailService.verifyAuthorizationCode(verifyRequestDto));
    }

}
