package com.d102.api.controller;

import com.d102.api.controller.docs.UserControllerDocs;
import com.d102.api.dto.UserDto;
import com.d102.api.service.UserService;
import com.d102.common.constant.UserConstant;
import com.d102.common.response.Response;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RequestMapping("/user")
@RequiredArgsConstructor
@RestController
public class UserController implements UserControllerDocs {

    private final UserService userService;

    @GetMapping
    public Response get() {
        return new Response(UserConstant.USER, userService.get());
    }

    @PatchMapping
    public Response update(@RequestBody UserDto.UpdateRequest updateRequestDto) {
        return new Response(UserConstant.USER, userService.update(updateRequestDto));
    }
}
