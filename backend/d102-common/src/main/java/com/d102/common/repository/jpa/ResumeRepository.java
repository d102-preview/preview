package com.d102.common.repository.jpa;

import com.d102.common.domain.jpa.Resume;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ResumeRepository extends JpaRepository<Resume, Long> {

    int countByUser_Email(String email);

    List<Resume> findByUser_Email(String email);

}
