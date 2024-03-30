package com.d102.api.repository.jpa;

import com.d102.common.domain.jpa.ResumeKeyword;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ResumeKeywordRepository extends JpaRepository<ResumeKeyword, Long> {

    List<ResumeKeyword> findByResumeQuestion_id(Long resumeQuestionId);

}
