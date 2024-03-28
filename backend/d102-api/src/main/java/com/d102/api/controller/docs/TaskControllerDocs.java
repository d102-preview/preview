package com.d102.api.controller.docs;

import com.d102.common.response.Response;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.media.SchemaProperty;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.constraints.NotNull;

@Tag(name = "7. 작업 완료 여부 관련 API", description = "작업 완료 여부를 조회하는 API (이력서 기반 질문 생성, 꼬리질문 생성 등)")
public interface TaskControllerDocs {

    @Operation(summary = "이력서 기반 질문 생성 작업 완료 여부 조회", description = "이력서 기반 질문 생성 작업 완료 여부를 조회하는 API를 호출한다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "성공시 이력서 기반 질문 생성 작업 완료 여부를 반환한다.",
                    content = @Content(schemaProperties = {
                            @SchemaProperty(name = "result", schema = @Schema(defaultValue = "ok", description = "요청 성공")),
                            @SchemaProperty(name = "data", schema = @Schema(implementation = CompleteResponse.class))
                    }))
    })
    Response checkQuestionListTask(@NotNull(message = "not null") Long resumeId);


    class CompleteResponse { public Boolean complete; }

}
