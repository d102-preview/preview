package com.d102.api.service.impl;

import com.d102.api.dto.FollowUpQuestionDto;
import com.d102.api.service.FollowUpQuestionService;
import com.d102.common.service.AsyncService;
import com.d102.common.util.OpenAiApi;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class FollowUpQuestionServiceImpl implements FollowUpQuestionService {

    private final OpenAiApi openAiApi;

    public FollowUpQuestionDto.Response get(FollowUpQuestionDto.Request requestDto) {
        OpenAiApi.Response response = openAiApi.generateFollowUpQuestion(requestDto.getQuestion(), requestDto.getAnswer());
        String question = response.getChoices().getFirst().getMessage().getContent();
        return FollowUpQuestionDto.Response.builder()
                .question(question).build();
    }

}
