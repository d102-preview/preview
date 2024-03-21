package com.d102.api.service.impl;

import com.d102.api.dto.request.EmailRequest;
import com.d102.api.dto.request.JoinRequest;
import com.d102.api.dto.response.UserResponse;
import com.d102.api.mapper.UserMapper;
import com.d102.api.service.AuthService;
import com.d102.common.constant.RoleName;
import com.d102.common.domain.User;
import com.d102.common.exception.ExceptionType;
import com.d102.common.exception.custom.ConflictException;
import com.d102.common.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Service
public class AuthServiceImpl implements AuthService {

    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;
    private final UserMapper userMapper;

    @Transactional
    public UserResponse join(JoinRequest joinRequest) {
        checkExistedEmail(joinRequest.getEmail());

        User user = userMapper.toUser(joinRequest);
        user.setPassword(passwordEncoder.encode(joinRequest.getPassword()));
        user.setRole(RoleName.USER);

        return userMapper.toUserResponseDto(userRepository.saveAndFlush(user));
    }

    @Transactional(readOnly = true)
    public Boolean checkAvailableEmail(String email) {
        return userRepository.findByEmail(email).isEmpty();
    }

    @Transactional(readOnly = true)
    public Boolean sendEmail(EmailRequest emailRequest) {
        checkExistedEmail(emailRequest.getEmail());
        return null;
    }

    private void checkExistedEmail(String email) {
        userRepository.findByEmail(email)
                .ifPresent(user -> {
                    throw new ConflictException(ExceptionType.EmailExistedException);
                });
    }

}
