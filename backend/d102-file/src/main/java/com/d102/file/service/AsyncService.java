package com.d102.file.service;

public interface AsyncService {

    void generateQuestionListByText(Long resumeId, String email);

    void analyzeVideo(Long analysisId);

}
