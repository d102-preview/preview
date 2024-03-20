package com.d102.api.service;

import com.d102.api.dto.request.JoinDto;
import com.d102.api.dto.response.UserResponseDto;

public interface AuthService {

    Boolean checkDuplicatedEmail(String email);

    UserResponseDto join(JoinDto joinDto);

}
