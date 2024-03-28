package com.d102.common.repository.jpa;

import com.d102.common.domain.jpa.Resume;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ResumeRepository extends JpaRepository<Resume, Long> {

    int countByUser_Email(String email);

}
