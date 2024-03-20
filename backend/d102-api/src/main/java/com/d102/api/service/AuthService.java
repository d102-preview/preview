package com.d102.api.service;

import com.d102.api.dto.request.EmailDto;
import com.d102.api.dto.request.JoinDto;
import com.d102.api.dto.response.UserResponseDto;

public interface AuthService {

    UserResponseDto join(JoinDto joinDto);

    Boolean checkAvailableEmail(String email);

    Boolean sendEmail(EmailDto emailDto);

}
