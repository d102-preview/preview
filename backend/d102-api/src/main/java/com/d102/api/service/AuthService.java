package com.d102.api.service;

import com.d102.api.dto.UserDto;
import jakarta.servlet.http.HttpServletResponse;

public interface AuthService {

    UserDto.Response join(UserDto.JoinRequest joinRequestDto);

    UserDto.Response login(UserDto.LoginRequest loginRequestDto, HttpServletResponse servletResponse);

}
