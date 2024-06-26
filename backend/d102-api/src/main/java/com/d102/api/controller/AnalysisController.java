package com.d102.api.controller;

import com.d102.api.controller.docs.AnalysisControllerDocs;
import com.d102.api.service.AnalysisService;
import com.d102.common.constant.AnalysisConstant;
import com.d102.common.response.Response;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("/analysis")
@RequiredArgsConstructor
@RestController
public class AnalysisController implements AnalysisControllerDocs {

    private final AnalysisService analysisService;

    /**
     * TODO: 추후 PathVariable을 바로 enum으로 받도록 수정
     */
    @GetMapping("/list/{type}")
    public Response getList(@PathVariable String type, @PageableDefault(sort = "id", direction = Sort.Direction.DESC) Pageable pageable) {
        return new Response(AnalysisConstant.INTERVIEW_LIST, analysisService.getList(type, pageable));
    }

    @GetMapping("/{analysisId}")
    public Response get(Long analysisId) throws Exception {
        return new Response(AnalysisConstant.ANALYSIS_DETAIL, analysisService.get(analysisId));
    }

}
