package com.d102.api.controller;

import com.d102.api.controller.docs.CommonQuestionControllerDocs;
import com.d102.api.dto.CommonKeywordDto;
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
        return new Response(CommonQuestionConstant.QUESTION_LIST, commonQuestionService.getList(pageable));
    }

    @GetMapping("/{commonQuestionId}")
    public Response get(@PathVariable Long commonQuestionId) {
        return new Response(CommonQuestionConstant.QUESTION_DETAIL, commonQuestionService.get(commonQuestionId));
    }

    @PostMapping("/script/{commonQuestionId}")
    public Response writeScript(@PathVariable Long commonQuestionId, @RequestBody CommonScriptDto.Request requestDto) {
        return new Response(CommonQuestionConstant.QUESTION_SCRIPT, commonQuestionService.writeScript(commonQuestionId, requestDto));
    }

    @PostMapping("/keyword/{commonQuestionId}")
    public Response createKeyword(@PathVariable Long commonQuestionId, @RequestBody CommonKeywordDto.Request requestDto) {
        return new Response(CommonQuestionConstant.QUESTION_KEYWORD, commonQuestionService.createKeyword(commonQuestionId, requestDto));
    }

    @PatchMapping("/keyword/{commonKeywordId}")
    public Response updateKeyword(@PathVariable Long commonKeywordId, @RequestBody CommonKeywordDto.Request requestDto) {
        return new Response(CommonQuestionConstant.QUESTION_KEYWORD, commonQuestionService.updateKeyword(commonKeywordId, requestDto));
    }

    @DeleteMapping("/keyword/{commonKeywordId}")
    public Response deleteKeyword(@PathVariable Long commonKeywordId) {
        commonQuestionService.deleteKeyword(commonKeywordId);
        return new Response();
    }

}
