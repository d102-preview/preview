package com.d102.common.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.NonNull;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
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

    private static final String BEARER = "Bearer ";
    private static final int TOKEN_BEGIN_IDX = 7;

    private static final String[] PERMIT_URL_ARRAY = {
            /* api */
            "/email/**",
            "/auth/**",
            /* swagger v3 */
            "/v3/api-docs/**",
            "/swagger-ui/**",
            /* health */
            "/health/**",
    };

    private final JwtManager jwtManager;
    private final RequestMatcher permitMatcher;

    private JwtAuthenticationFilter(JwtManager jwtManager) {
        this.jwtManager = jwtManager;
        List<RequestMatcher> matchers = Arrays.stream(PERMIT_URL_ARRAY)
                .map(AntPathRequestMatcher::new)
                .collect(Collectors.toList());
        this.permitMatcher = new OrRequestMatcher(matchers);
    }

    @Override
    protected void doFilterInternal(@NonNull HttpServletRequest request, @NonNull HttpServletResponse response, @NonNull FilterChain filterChain)
            throws ServletException, IOException {
        if (permitMatcher.matches(request)) {
            filterChain.doFilter(request, response);
            return;
        }

        String token = resolveToken(request);
        String method = request.getMethod();
        String uri = request.getRequestURI();

//        if (StringUtils.hasText(token) && jwtManager.validateToken(token)) {
//            Authentication authentication = jwtManager.getAuthentication(token);
//            SecurityContextHolder.getContext().setAuthentication(authentication);
//            log.debug("Token ok : username {}, request {} {}", authentication != null ? authentication.getName() : null, method, uri);
//        } else {
//            log.debug("No token : uri {} {}", method, uri);
//        }

        filterChain.doFilter(request, response);
    }

    private String resolveToken(HttpServletRequest request) {
        String authorization = request.getHeader(HttpHeaders.AUTHORIZATION);
        if (StringUtils.hasText(authorization) && authorization.startsWith(BEARER)) {
            return authorization.substring(TOKEN_BEGIN_IDX);
        }
        return null;
    }

}
