package com.d102.api.service.impl;

import com.d102.api.dto.UserDto;
import com.d102.api.mapper.UserMapper;
import com.d102.api.service.UserService;
import com.d102.common.domain.User;
import com.d102.common.exception.ExceptionType;
import com.d102.common.exception.custom.NotFoundException;
import com.d102.common.exception.custom.UnAuthorizeException;
import com.d102.common.repository.UserRepository;
import com.d102.common.util.SecurityHelper;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@RequiredArgsConstructor
@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final UserMapper userMapper;
    private final SecurityHelper securityHelper;
    private final PasswordEncoder passwordEncoder;

    @Transactional(readOnly = true)
    public UserDto.Response get() {
        return userMapper.toUserResponseDto(userRepository.findByEmail(
                securityHelper.getLoginUsername()).orElse(null));
    }

    @Transactional
    public UserDto.Response update(UserDto.UpdateRequest updateRequestDto) {
        return userRepository.findByEmail(securityHelper.getLoginUsername())
                .map(user -> {
                    user.setName(updateRequestDto.getName());
                    return userMapper.toUserResponseDto(user);
                }).orElseThrow(() -> new NotFoundException(ExceptionType.UserNotFoundException));
    }

    @Transactional
    public void changePassword(UserDto.PasswordUpdateRequest passwordUpdateRequestDto) {
        User user = getUser(securityHelper.getLoginUsername());

        verifyCurrentPassword(passwordUpdateRequestDto.getCurrentPassword(), user.getPassword());
        checkChagedPassword(passwordUpdateRequestDto.getChangedPassword(), passwordUpdateRequestDto.getCheckChangePassword());

        user.setPassword(passwordEncoder.encode(passwordUpdateRequestDto.getChangedPassword()));
    }

    @Transactional
    public void delete() {
        User user = getUser(securityHelper.getLoginUsername());

        user.setDeletedTime(LocalDateTime.now());
    }

    private void checkChagedPassword(String changedPassword, String checkChangePassword) {
        if (!changedPassword.equals(checkChangePassword)) {
            throw new UnAuthorizeException(ExceptionType.WrongChangedPasswordException);
        }
    }

    private void verifyCurrentPassword(String requestPassword, String password) {
        if (!passwordEncoder.matches(requestPassword, password)) {
            throw new UnAuthorizeException(ExceptionType.InvalidCurrentPasswordException);
        }
    }

    public User getUser(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new NotFoundException(ExceptionType.UserNotFoundException));
    }

}
