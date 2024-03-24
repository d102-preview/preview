package com.d102.api.service.impl;

import com.d102.api.dto.UserDto;
import com.d102.api.mapper.UserMapper;
import com.d102.api.service.AuthService;
import com.d102.common.constant.RoleName;
import com.d102.common.domain.User;
import com.d102.common.exception.ExceptionType;
import com.d102.common.exception.custom.ConflictException;
import com.d102.common.exception.custom.NotFoundException;
import com.d102.common.exception.custom.UnAuthorizeException;
import com.d102.common.repository.UserRepository;
import com.d102.common.security.JwtManager;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collections;
import java.util.List;

@RequiredArgsConstructor
@Service
public class AuthServiceImpl implements AuthService {

    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;
    private final UserMapper userMapper;
    private final JwtManager jwtManager;

    @Transactional
    public UserDto.Response join(UserDto.JoinRequest joinRequestDto) {
        checkExistedEmail(joinRequestDto.getEmail());

        User user = userMapper.toUser(joinRequestDto);
        user.setPassword(passwordEncoder.encode(joinRequestDto.getPassword()));
        user.setRole(RoleName.USER);

        return userMapper.toUserResponseDto(userRepository.saveAndFlush(user));
    }

    @Transactional
    public UserDto.Response login(UserDto.LoginRequest loginRequestDto, HttpServletResponse servletResponse) {
        User loginUser = getLoginUser(loginRequestDto.getEmail());

        checkPassword(loginRequestDto.getPassword(), loginUser.getPassword());

        List<GrantedAuthority> grantedAuthorities = Collections.singletonList(new SimpleGrantedAuthority(loginUser.getRole().toString()));
        Authentication authentication = jwtManager.getAuthentication(loginUser.getEmail(), grantedAuthorities);

        jwtManager.createAccessToken(authentication, servletResponse);
        jwtManager.createRefreshToken(authentication, servletResponse);

        return userMapper.toUserResponseDto(loginUser);
    }

    private void checkPassword(String requestPassword, String userPassword) {
        if (!passwordEncoder.matches(requestPassword, userPassword)) {
            throw new UnAuthorizeException(ExceptionType.InvalidLoginUserException);
        }
    }

    private User getLoginUser(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new NotFoundException(ExceptionType.LoginUserNotFoundException));
    }

    private void checkExistedEmail(String email) {
        userRepository.findByEmail(email)
                .ifPresent(user -> {
                    throw new ConflictException(ExceptionType.EmailExistedException);
                });
    }

}
