package com.d102.api.controller;

import com.d102.api.controller.docs.CommonQuestionControllerDocs;
import com.d102.api.dto.CommonScriptDto;
import com.d102.api.service.CommonQuestionService;
import com.d102.common.constant.CommonQuestionConstant;
import com.d102.common.response.Response;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

@RequestMapping("/common/question")
@RequiredArgsConstructor
@RestController
public class CommonQuestionController implements CommonQuestionControllerDocs {

    private final CommonQuestionService commonQuestionService;

    @GetMapping("/list")
    public Response getList(Pageable pageable) {
        return new Response(CommonQuestionConstant.COMMON_QUESTION_LIST, commonQuestionService.getList(pageable));
    }

    @GetMapping
    public Response get(@RequestParam Long commonQuestionId) {
        return new Response(CommonQuestionConstant.QUESTION_DETAIL, commonQuestionService.get(commonQuestionId));
    }

    @PostMapping("/script")
    public Response writeScript(@RequestParam Long commonQuestionId, @RequestBody CommonScriptDto.Request request) {
        commonQuestionService.writeScript(commonQuestionId, request);
        return new Response();
    }

}
