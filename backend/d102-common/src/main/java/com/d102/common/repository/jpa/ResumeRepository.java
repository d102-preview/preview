package com.d102.common.repository.jpa;

import com.d102.common.domain.Resume;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ResumeRepository extends JpaRepository<Resume, Long> {

    int countByUser_Email(String email);

}
