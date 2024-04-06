package com.d102.common.security;

import com.d102.common.config.SecurityConfig;
import com.d102.common.constant.AuthConstant;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.NonNull;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.security.web.util.matcher.OrRequestMatcher;
import org.springframework.security.web.util.matcher.RequestMatcher;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtManager jwtManager;
    private final RequestMatcher permitMatcher;

    private JwtAuthenticationFilter(JwtManager jwtManager) {
        this.jwtManager = jwtManager;
        List<RequestMatcher> matcherList = Arrays.stream(SecurityConfig.PERMIT_URL_LIST)
                .map(AntPathRequestMatcher::new)
                .collect(Collectors.toList());
        this.permitMatcher = new OrRequestMatcher(matcherList);
    }

    @Override
    protected void doFilterInternal(@NonNull HttpServletRequest servletRequest, @NonNull HttpServletResponse servletResponse, @NonNull FilterChain filterChain)
            throws ServletException, IOException {
        if (permitMatcher.matches(servletRequest)) {
            filterChain.doFilter(servletRequest, servletResponse);
            return;
        }

        String accessToken = resolveAccessToken(servletRequest);
        String refreshToken = resolveRefreshToken(servletRequest);
        String method = servletRequest.getMethod();
        String uri = servletRequest.getRequestURI();

        if (StringUtils.hasText(accessToken)) {
            accessToken = jwtManager.validateToken(accessToken, refreshToken, servletResponse);

            if (!accessToken.isEmpty()) {
                Authentication authentication = jwtManager.getAuthentication(accessToken);
                SecurityContextHolder.getContext().setAuthentication(authentication);
                log.debug("Token ok : username {}, request {} {}", authentication != null ? authentication.getName() : null, method, uri);
            }
        } else {
            log.debug("No token : uri {} {}", method, uri);
        }

        filterChain.doFilter(servletRequest, servletResponse);
    }

    private String resolveAccessToken(HttpServletRequest request) {
        String authorization = request.getHeader(HttpHeaders.AUTHORIZATION);
        if (StringUtils.hasText(authorization) && authorization.startsWith(AuthConstant.AUTHORIZATION_PREFIX)) {
            return authorization.substring(AuthConstant.TOKEN_BEGIN_IDX);
        }
        return null;
    }

    private String resolveRefreshToken(HttpServletRequest request){
        Cookie[] cookies = request.getCookies();
        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if (AuthConstant.REFRESH_TOKEN.equals(cookie.getName())) {
                    return cookie.getValue();
                }
            }
        }
        return null;
    }

}
