package com.d102.common.service;

import com.d102.common.domain.jpa.Resume;

public interface AsyncService {

    void generateAndSaveQuestionList(String savePath, Resume resume);

}
