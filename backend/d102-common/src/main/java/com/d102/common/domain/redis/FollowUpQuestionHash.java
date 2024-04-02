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
@RedisHash(value = "followUpHash", timeToLive = RedisConstant.FOLLOW_UP_QUESTION_LIFE)
public class FollowUpQuestionHash {

    @Id
    private String id;

    private String status;

}
