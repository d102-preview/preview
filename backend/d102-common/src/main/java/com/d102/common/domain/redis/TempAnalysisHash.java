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
@RedisHash(value = "tempAnalysisHash", timeToLive = RedisConstant.ANALYSIS_LIFE)
public class TempAnalysisHash {

    @Id
    private Long id;

    private String status;

}
