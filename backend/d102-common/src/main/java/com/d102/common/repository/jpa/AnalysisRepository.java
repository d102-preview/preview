package com.d102.common.repository.jpa;

import com.d102.common.constant.InterviewType;
import com.d102.common.domain.jpa.Analysis;
import com.d102.common.domain.jpa.Interview;
import io.lettuce.core.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface AnalysisRepository extends JpaRepository<Analysis, Long> {

}
