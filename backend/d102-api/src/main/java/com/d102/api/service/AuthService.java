package com.d102.api.service;

import com.d102.api.dto.UserDto;

public interface AuthService {

    UserDto.Response join(UserDto.JoinRequest joinRequestDto);

}
