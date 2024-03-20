package com.d102.api.controller;

import com.d102.api.controller.docs.AuthControllerDocs;
import com.d102.api.dto.request.EmailDto;
import com.d102.api.dto.request.JoinDto;
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
    public Response join(@RequestBody JoinDto joinDto) {
        return new Response("user", authService.join(joinDto));
    }

    @GetMapping("/email")
    public Response checkAvailableEmail(@RequestParam String email) {
        return new Response("available", authService.checkAvailableEmail(email));
    }

    @PostMapping("/email")
    public Response sendEmail(@RequestBody EmailDto emailDto) {
        return new Response("send", authService.sendEmail(emailDto));
    }

}
