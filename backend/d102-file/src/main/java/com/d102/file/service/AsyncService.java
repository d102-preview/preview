package com.d102.file.service;

public interface AsyncService {

    void generateAndSaveQuestionList(Long resumeId, String email);

    void analyzeVideo(Long analysisId);

}
