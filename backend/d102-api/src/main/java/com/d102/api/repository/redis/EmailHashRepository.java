package com.d102.api.repository.redis;

import com.d102.api.domain.redis.EmailHash;
import org.springframework.data.repository.CrudRepository;

public interface EmailHashRepository extends CrudRepository<EmailHash, String> {

}
