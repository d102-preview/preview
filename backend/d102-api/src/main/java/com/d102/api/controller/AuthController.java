package com.d102.api.controller;

import com.d102.api.controller.docs.AuthControllerDocs;
import com.d102.api.dto.UserDto;
import com.d102.api.service.AuthService;
import com.d102.common.constant.AuthConstant;
import com.d102.common.response.Response;
import jakarta.servlet.http.HttpServletResponse;
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

    @PostMapping("/join")
    public Response join(@RequestBody UserDto.JoinRequest joinRequestDto) {
        return new Response(AuthConstant.USER, authService.join(joinRequestDto));
    }

    @PostMapping("/login")
    public Response login(@RequestBody UserDto.loginRequest loginRequestDto, HttpServletResponse servletResponse) {
        return new Response(AuthConstant.USER, authService.login(loginRequestDto, servletResponse));
    }

}
