package com.d102.common.repository;

import com.d102.common.domain.User;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    @Transactional
    Optional<User> findByEmail(String email);
}