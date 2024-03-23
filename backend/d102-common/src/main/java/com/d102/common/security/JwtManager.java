package com.d102.common.security;

import com.d102.common.domain.redis.RefreshTokenHash;
import com.d102.common.repository.redis.RefreshTokenHashRepository;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;
import java.util.List;

@Slf4j
@RequiredArgsConstructor
@Component
public class JwtManager {

    private static final String AUTHORIZATION_HEADER = "Authorization";
    private static final String AUTHORIZATION_PREFIX = "Bearer ";
    private static final String AUTHORITIES_KEY = "auth";

    @Value("${jwt.access-token-key}")
    private String accessTokenKey;

    @Value("${jwt.refresh-token-key}")
    private String refreshTokenKey;

    @Value("${jwt.access-token-validity-in-seconds}")
    private long accessTokenValidityInMilliseconds;

    @Value("${jwt.refresh-token-validity-in-seconds}")
    private long refreshTokenValidityInMilliseconds;

    private final UserDetailsService userDetailsService;
    private final RefreshTokenHashRepository refreshTokenHashRepository;

    public Authentication getAuthentication(String email, String token, List<GrantedAuthority> grantedAuthorities){
        return new UsernamePasswordAuthenticationToken(userDetailsService.loadUserByUsername(email), token, grantedAuthorities);
    }

    public void createAccessToken(Authentication authentication, HttpServletResponse servletResponse) {
        String accessToken = generateToken(authentication, accessTokenKey, accessTokenValidityInMilliseconds);
        servletResponse.setHeader(AUTHORIZATION_HEADER, AUTHORIZATION_PREFIX + accessToken);
    }

    public void createRefreshToken(Authentication authentication, HttpServletResponse servletResponse) {
        String refreshToken = generateToken(authentication, refreshTokenKey, refreshTokenValidityInMilliseconds);

        refreshTokenHashRepository.save(RefreshTokenHash.builder()
                        .email(authentication.getName())
                        .refreshToken(refreshToken)
                        .build());

        Cookie refreshTokenCookie = new Cookie("refreshToken", refreshToken);
        refreshTokenCookie.setHttpOnly(true);
        refreshTokenCookie.setSecure(true);
        refreshTokenCookie.setMaxAge((int)(refreshTokenValidityInMilliseconds / 1000));

        servletResponse.addCookie(refreshTokenCookie);
    }

    public String generateToken(Authentication authentication, String tokenKey, long time) {
        String authorities = authentication.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority).toString();

        byte[] keyBytes = Decoders.BASE64.decode(tokenKey);
        Key key = Keys.hmacShaKeyFor(keyBytes);

        long now = (new Date()).getTime();
        Date expiredDate = new Date(now + time);

        return Jwts.builder()
                .subject(authentication.getName())
                .issuedAt(new Date())
                .expiration(expiredDate)
                .signWith(key)
                .claim(AUTHORITIES_KEY, authorities)
                .expiration(expiredDate)
                .compact();
    }

}
