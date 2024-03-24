package com.d102.common.security;

import com.d102.common.constant.AuthConstant;
import com.d102.common.domain.redis.RefreshTokenHash;
import com.d102.common.repository.redis.RefreshTokenHashRepository;
import io.jsonwebtoken.*;
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
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.security.Key;
import java.util.*;

@Slf4j
@RequiredArgsConstructor
@Component
public class JwtManager {

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

    public String createAccessToken(Authentication authentication, HttpServletResponse servletResponse) {
        String accessToken = generateToken(authentication, accessTokenKey, accessTokenValidityInMilliseconds);
        servletResponse.setHeader(AuthConstant.AUTHORIZATION_HEADER, AuthConstant.AUTHORIZATION_PREFIX + accessToken);
        return accessToken;
    }

    // TODO : think detailed jwt exception
    public String recreateAccessToken(String subject, String role, String accessTokenKen, String refreshToken, HttpServletResponse servletResponse){
        try {
            String refreshTokenHash = getRefreshTokenHash(subject);
            if (refreshToken.equals(refreshTokenHash)) {
                List<GrantedAuthority> grantedAuthorities = Collections.singletonList(new SimpleGrantedAuthority(role));
                Authentication authentication = getAuthentication(subject, grantedAuthorities);
                return createAccessToken(authentication, servletResponse);
            }
            return null;
        } catch (Exception e) {
            return null;
        }
    }

    public void createRefreshToken(Authentication authentication, HttpServletResponse servletResponse) {
        String refreshToken = generateToken(authentication, refreshTokenKey, refreshTokenValidityInMilliseconds);

        refreshTokenHashRepository.save(RefreshTokenHash.builder()
                        .email(authentication.getName())
                        .refreshToken(refreshToken)
                        .build());

        Cookie refreshTokenCookie = new Cookie(AuthConstant.REFRESH_TOKEN, refreshToken);
        refreshTokenCookie.setHttpOnly(true);
        refreshTokenCookie.setSecure(true);
        refreshTokenCookie.setMaxAge((int)(refreshTokenValidityInMilliseconds / AuthConstant.MILLISECOND_TO_SECOND));

        servletResponse.addCookie(refreshTokenCookie);
    }

    public Authentication getAuthentication(String email, List<GrantedAuthority> grantedAuthorities){
        return new UsernamePasswordAuthenticationToken(userDetailsService.loadUserByUsername(email), null, grantedAuthorities);
    }

    public String getRefreshTokenHash(String email) {
        return refreshTokenHashRepository.findById(email).map(RefreshTokenHash::getRefreshToken)
                .orElse(null);
    }

    public Authentication getAuthentication(String token){
        Claims claims = getClaims(token);

        Collection<? extends GrantedAuthority> authorities =
                Arrays.stream(claims.get(AuthConstant.AUTHORITIES_KEY).toString().split(","))
                        .map(SimpleGrantedAuthority::new).toList();

        User principal = new User(claims.getSubject(), "", authorities);
        return new UsernamePasswordAuthenticationToken(principal, token, authorities);
    }

    private String generateToken(Authentication authentication, String tokenKey, long time) {
        String authorities = authentication.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority).toString();

        Key key = getKey(tokenKey);

        long now = (new Date()).getTime();
        Date expiredDate = new Date(now + time * AuthConstant.SECOND_TO_MILLISECOND);

        return Jwts.builder()
                .subject(authentication.getName())
                .issuedAt(new Date())
                .expiration(expiredDate)
                .signWith(key)
                .claim(AuthConstant.AUTHORITIES_KEY, authorities)
                .expiration(expiredDate)
                .compact();
    }

    private static Key getKey(String tokenKey) {
        byte[] keyBytes = Decoders.BASE64.decode(tokenKey);
        return Keys.hmacShaKeyFor(keyBytes);
    }

    // TODO : think detailed jwt exception
    public String validateToken(String accessToken, String refreshToken, HttpServletResponse servletResponse) {
        try {
            getClaims(accessToken);
            return accessToken;
        } catch (ExpiredJwtException ex) {
            return recreateAccessToken(getClaims(accessToken).getSubject(), getClaims(accessToken).get(AuthConstant.AUTHORITIES_KEY).toString(),
                                        accessToken, refreshToken, servletResponse);
        }
    }

    private Claims getClaims(String accessToken) {
        return Jwts.parser()
                .verifyWith((SecretKey) getKey(accessTokenKey))
                .build()
                .parseSignedClaims(accessToken)
                .getPayload();
    }

}
