package com.d102.common.domain.redis;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;

@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@RedisHash(value = "followUp", timeToLive = 604800)
public class FollowUpQuestionHash {

    @Id
    private Long id;

    private String status;

}
