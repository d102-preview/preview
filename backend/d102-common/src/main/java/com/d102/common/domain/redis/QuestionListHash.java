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
@RedisHash(value = "questionListHash", timeToLive = RedisConstant.QUESTION_LIST_LIFE)
public class QuestionListHash {

    @Id
    private String id;

    private String status;

}
