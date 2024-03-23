package com.d102.api.service.impl;

import com.d102.api.dto.UserDto;
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
    public UserDto.Response join(UserDto.JoinRequest joinRequestDto) {
        checkExistedEmail(joinRequestDto.getEmail());

        User user = userMapper.toUser(joinRequestDto);
        user.setPassword(passwordEncoder.encode(joinRequestDto.getPassword()));
        user.setRole(RoleName.USER);

        return userMapper.toUserResponseDto(userRepository.saveAndFlush(user));
    }

    private void checkExistedEmail(String email) {
        userRepository.findByEmail(email)
                .ifPresent(user -> {
                    throw new ConflictException(ExceptionType.EmailExistedException);
                });
    }

}
