package com.d102.api.service.impl;

import com.d102.api.dto.UserDto;
import com.d102.api.mapper.UserMapper;
import com.d102.api.service.UserService;
import com.d102.common.repository.UserRepository;
import com.d102.common.util.SecurityHelper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final UserMapper userMapper;
    private final SecurityHelper securityHelper;

    @Transactional(readOnly = true)
    public UserDto.Response get() {
        return userMapper.toUserResponseDto(userRepository.findByEmail(
                securityHelper.getLoginUsername()).orElse(null));
    }
    
}
