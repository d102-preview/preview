package com.d102.api.controller;

import com.d102.api.controller.docs.FollowUpQuestionControllerDocs;
import com.d102.api.dto.FollowUpQuestionDto;
import com.d102.api.service.FollowUpQuestionService;
import com.d102.common.constant.FollowUpQuestionConstant;
import com.d102.common.response.Response;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("/followup/question")
@RequiredArgsConstructor
@RestController
public class FollowUpQuestionController implements FollowUpQuestionControllerDocs {

    private final FollowUpQuestionService followUpQuestionService;

    @PostMapping
    public Response get(@RequestBody FollowUpQuestionDto.Request requestDto) {
        return new Response(FollowUpQuestionConstant.FOLLOW_UP_QUESTION, followUpQuestionService.get(requestDto));
    }

}
