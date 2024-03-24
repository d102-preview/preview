package com.d102.api.repository;

import com.d102.api.domain.CommonKeyword;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CommonKeywordRepository extends JpaRepository<CommonKeyword, Long> {

    List<CommonKeyword> findByUser_EmailAndCommonQuestion_Id(String email, Long questionId);

}
