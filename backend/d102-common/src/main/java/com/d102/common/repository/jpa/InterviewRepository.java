package com.d102.common.repository.jpa;

import com.d102.common.constant.InterviewType;
import com.d102.common.domain.jpa.Interview;
import io.lettuce.core.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InterviewRepository extends JpaRepository<Interview, Long> {

    Page<Interview> findByType(InterviewType type, Pageable pageable);

}
