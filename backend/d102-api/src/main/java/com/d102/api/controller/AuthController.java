package com.d102.api.controller;

import com.d102.api.controller.docs.AuthControllerDocs;
import com.d102.api.dto.request.EmailRequest;
import com.d102.api.dto.request.JoinRequest;
import com.d102.api.service.AuthService;
import com.d102.common.response.Response;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;


@RequestMapping("/auth")
@RequiredArgsConstructor
@RestController
public class AuthController implements AuthControllerDocs {

    private final AuthService authService;

    @PostMapping("/join")
    public Response join(@RequestBody JoinRequest joinRequest) {
        return new Response("user", authService.join(joinRequest));
    }

    @GetMapping("/email")
    public Response checkAvailableEmail(@RequestParam String email) {
        return new Response("available", authService.checkAvailableEmail(email));
    }

    @PostMapping("/email")
    public Response sendEmail(@RequestBody EmailRequest emailRequest) {
        return new Response("send", authService.sendEmail(emailRequest));
    }

}
