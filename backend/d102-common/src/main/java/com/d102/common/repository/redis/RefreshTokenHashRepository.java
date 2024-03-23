package com.d102.common.repository.redis;

import com.d102.common.domain.redis.RefreshTokenHash;
import org.springframework.data.repository.CrudRepository;

public interface RefreshTokenHashRepository extends CrudRepository<RefreshTokenHash, String> {

}
