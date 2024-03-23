package com.d102.common.domain.redis;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;

@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@RedisHash(value = "refreshTokenHash", timeToLive = 604800)
public class RefreshTokenHash {

    @Id
    private String email;

    private String refreshToken;

}
