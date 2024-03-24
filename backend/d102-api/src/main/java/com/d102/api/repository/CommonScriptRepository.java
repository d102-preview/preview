package com.d102.api.repository;

import com.d102.api.domain.CommonScript;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CommonScriptRepository extends JpaRepository<CommonScript, Long> {

    Optional<CommonScript> findByUser_EmailAndCommonQuestion_Id(String email, Long questionId);

}
