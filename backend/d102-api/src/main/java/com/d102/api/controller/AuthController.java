package com.d102.api.controller;

import com.d102.api.controller.docs.AuthControllerDocs;
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

    @GetMapping("/email")
    public Response checkDuplicatedEmail(@RequestParam String email){
        return new Response("isDuplicateEmail", authService.checkDuplicatedEmail(email));
    }


    @PostMapping("/join")
    public Response join(@RequestBody JoinDto joinDto) {
        return new Response("user", authService.join(joinDto));
    }

}
