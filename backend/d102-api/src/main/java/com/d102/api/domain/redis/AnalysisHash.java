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
@RedisHash(value = "analysisHash", timeToLive = RedisConstant.ANALYSIS_LIFE)
public class AnalysisHash {

    @Id
    private String id;

    private String status;

}
