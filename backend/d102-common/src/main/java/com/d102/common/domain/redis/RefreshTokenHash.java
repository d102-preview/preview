package com.d102.common.domain.redis;

import com.d102.common.constant.RedisConstant;
import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;

@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@RedisHash(value = "refreshTokenHash", timeToLive = RedisConstant.REFRESH_TOKEN_LIFE)
public class RefreshTokenHash {

    @Id
    private String email;

    private String refreshToken;

}
