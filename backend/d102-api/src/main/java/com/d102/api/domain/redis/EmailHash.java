package com.d102.api.domain.redis;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;

@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@RedisHash(value = "emailHash", timeToLive = 1209600)
public class EmailHash  {

    @Id
    private String email;

    private int count;
    private int authorizationCode;

}
