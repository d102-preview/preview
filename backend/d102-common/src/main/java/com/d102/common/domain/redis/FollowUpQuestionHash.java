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
@RedisHash(value = "followUp", timeToLive = RedisConstant.FOLLOW_UP_QUESTION_LIFE)
public class FollowUpQuestionHash {

    @Id
    private Long id;

    private String status;

}
