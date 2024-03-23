package com.d102.api.service;

import com.d102.api.dto.EmailDto;

public interface EmailService {

    Boolean checkAvailableEmail(String email);

    void sendAuthorizationCode(EmailDto.Request requestDto);

    Boolean verifyAuthorizationCode(EmailDto.VerifyRequest verifyRequestDto);

}
