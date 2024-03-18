package com.d102.api.controller;

import com.d102.api.controller.docs.AuthControllerDocs;
import com.d102.api.dto.request.EmailDto;
import com.d102.api.dto.request.JoinDto;
import com.d102.api.service.AuthService;
import com.d102.common.response.Response;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("/auth")
@RequiredArgsConstructor
@RestController
public class AuthController implements AuthControllerDocs {

    private final AuthService authService;

    @Override
    @PostMapping("/email")
    public Response checkDuplicatedEmail(@Valid @RequestBody EmailDto emailDto){
        return new Response("isDuplicateEmail", authService.checkDuplicatedEmail(emailDto));
    }

    @Override
    @PostMapping("/join")
    public Response join(@Valid @RequestBody JoinDto joinDto) {
        return new Response("message", authService.join(joinDto));
    }

}
