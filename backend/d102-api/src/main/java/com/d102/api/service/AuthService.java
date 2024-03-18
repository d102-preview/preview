package com.d102.api.service;

import com.d102.api.dto.request.EmailDto;
import com.d102.api.dto.request.JoinDto;
import com.d102.api.dto.response.UserResponseDto;

public interface AuthService {

    Boolean checkDuplicatedEmail(EmailDto emailDto);

    UserResponseDto join(JoinDto joinDto);

}
