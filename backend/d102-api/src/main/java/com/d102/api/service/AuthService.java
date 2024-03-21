package com.d102.api.service;

import com.d102.api.dto.request.EmailRequest;
import com.d102.api.dto.request.JoinRequest;
import com.d102.api.dto.response.UserResponse;

public interface AuthService {

    UserResponse join(JoinRequest joinRequest);

    Boolean checkAvailableEmail(String email);

    Boolean sendEmail(EmailRequest emailRequest);

}
