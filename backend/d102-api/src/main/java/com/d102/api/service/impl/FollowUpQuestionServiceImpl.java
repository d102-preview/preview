package com.d102.api.service.impl;

import com.d102.api.dto.FollowUpQuestionDto;
import com.d102.api.service.FollowUpQuestionService;
import com.d102.common.constant.TaskConstant;
import com.d102.common.exception.ExceptionType;
import com.d102.common.exception.custom.InvalidException;
import com.d102.common.util.OpenAiApi;
import com.d102.common.util.ThreadHelper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClientException;

@RequiredArgsConstructor
@Service
public class FollowUpQuestionServiceImpl implements FollowUpQuestionService {

    private final OpenAiApi openAiApi;

    public FollowUpQuestionDto.Response get(FollowUpQuestionDto.Request requestDto) {
        OpenAiApi.Response response = null;
        String question = null;

        int retryCount = 0;
        boolean isRetry = true;
        while (isRetry && retryCount < TaskConstant.MAX_RETRY) {
            try {
                response = openAiApi.generateFollowUpQuestion(requestDto.getQuestion(), requestDto.getAnswer());
                question = response.getChoices().getFirst().getMessage().getContent();
                isRetry = false;
            } catch (RestClientException e) {
                retryCount++;
                if (retryCount >= TaskConstant.MAX_RETRY) {
                    throw new InvalidException(ExceptionType.OpenAiApiException);
                }
                ThreadHelper.sleep(TaskConstant.RETRY_INTERVAL);
            } catch (Exception e) {
                retryCount++;
                if (retryCount >= TaskConstant.MAX_RETRY) {
                    throw new InvalidException(ExceptionType.UnknownException);
                }
                ThreadHelper.sleep(TaskConstant.RETRY_INTERVAL);
            }
        }

        return FollowUpQuestionDto.Response.builder()
                .question(question).build();
    }

}
