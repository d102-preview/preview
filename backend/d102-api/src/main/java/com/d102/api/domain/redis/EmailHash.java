package com.d102.api.domain.redis;

import com.d102.common.constant.RedisConstant;
import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;

@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@RedisHash(value = "emailHash", timeToLive = RedisConstant.EMAIL_LIFE)
public class EmailHash  {

    @Id
    private String email;

    private int count;
    private int authorizationCode;

}
