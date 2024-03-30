package com.d102.api.controller.docs;

import com.d102.api.dto.InterviewDto;
import com.d102.common.response.Response;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.media.SchemaProperty;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;

import java.util.List;

@Tag(name = "9. 실전 면접 관련 API", description = "실련 면접 관련 질문 목록을 조회하는 API")
public interface InterviewControllerDocs {

    @Operation(summary = "실전 면접 질문 목록 조회", description = "실전 면접에 대한 질문 목록을 조회하는 API를 호출한다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "성공시 생성한 꼬리질문을 반환한다.",
                    content = @Content(schemaProperties = {
                            @SchemaProperty(name = "result", schema = @Schema(defaultValue = "ok", description = "요청 성공")),
                            @SchemaProperty(name = "data", schema = @Schema(implementation = QuestionListResponse.class))
                    }))
    })
    Response getList(Long resumeId);


    class QuestionListResponse { public List<InterviewDto.ListResponse> questionList; }

}
