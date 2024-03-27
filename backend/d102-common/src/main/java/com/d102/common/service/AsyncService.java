package com.d102.common.service;

import com.d102.common.domain.Resume;

public interface AsyncService {

    void generateAndSaveQuestionList(String savePath, Resume resume);

    void generateAndSaveFollowUpQuestion(String question, String answer);

}
