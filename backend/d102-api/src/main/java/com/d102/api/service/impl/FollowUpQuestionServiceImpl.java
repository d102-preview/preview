package com.d102.api.service.impl;

import com.d102.api.dto.FollowUpQuestionDto;
import com.d102.api.service.FollowUpQuestionService;
import com.d102.common.exception.ExceptionType;
import com.d102.common.exception.custom.InvalidException;
import com.d102.common.util.OpenAiApi;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClientException;

@RequiredArgsConstructor
@Service
public class FollowUpQuestionServiceImpl implements FollowUpQuestionService {

    private final OpenAiApi openAiApi;

    public FollowUpQuestionDto.Response get(FollowUpQuestionDto.Request requestDto) {
        OpenAiApi.Response response = null;
        try {
            response = openAiApi.generateFollowUpQuestion(requestDto.getQuestion(), requestDto.getAnswer());
        } catch (RestClientException e) {
            throw new InvalidException(ExceptionType.OpenAiApiException);
        }
        String question = response.getChoices().getFirst().getMessage().getContent();
        return FollowUpQuestionDto.Response.builder()
                .question(question).build();
    }

}
