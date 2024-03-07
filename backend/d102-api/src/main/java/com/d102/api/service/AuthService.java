package com.d102.api.service;

import com.d102.api.dto.request.EmailDto;

public interface AuthService {

    Boolean checkDuplicatedEmail(EmailDto emailDto);
}
