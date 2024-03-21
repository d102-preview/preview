package com.d102.api.controller;

import com.d102.api.controller.docs.AuthControllerDocs;
import com.d102.api.dto.EmailDto;
import com.d102.api.dto.UserDto;
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
    public Response join(@RequestBody UserDto.JoinRequest joinRequestDto) {
        return new Response("user", authService.join(joinRequestDto));
    }

    @GetMapping("/email")
    public Response checkAvailableEmail(@RequestParam String email) {
        return new Response("available", authService.checkAvailableEmail(email));
    }

    @PostMapping("/email")
    public Response sendEmail(@RequestBody EmailDto.Request requestDto) {
        return new Response("send", authService.sendEmail(requestDto));
    }

}
