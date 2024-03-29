package com.d102.common.repository.jpa;

import com.d102.common.domain.jpa.ResumeQuestion;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ResumeQuestionRepository extends JpaRepository<ResumeQuestion, Long> {

    Page<ResumeQuestion> findByResume_Id(Long resumeId, Pageable pageable);

}
