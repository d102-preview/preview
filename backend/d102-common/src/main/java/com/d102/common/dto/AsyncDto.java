package com.d102.common.dto;

import com.d102.common.domain.Resume;
import lombok.Builder;
import lombok.Data;

public class AsyncDto {

    @Builder
    @Data
    public static class QuestionListRequest {

        private String savePath;
        private Resume resume;
    }

    @Builder
    @Data
    public static class FollowUpQuestionRequest {

        private String question;
        private String answer;
    }

}
