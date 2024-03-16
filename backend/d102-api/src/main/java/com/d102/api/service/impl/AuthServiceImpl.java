package com.d102.api.service.impl;

import com.d102.api.dto.request.EmailDto;
import com.d102.api.service.AuthService;
import com.d102.common.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;

    @Override
    public Boolean checkDuplicatedEmail(EmailDto emailDto) {
        return userRepository.findByEmail(emailDto.getEmail()).isPresent();
    }
}
