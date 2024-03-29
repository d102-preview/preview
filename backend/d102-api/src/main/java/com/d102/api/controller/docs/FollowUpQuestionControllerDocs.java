package com.d102.api.controller.docs;

import com.d102.api.dto.FollowUpQuestionDto;
import com.d102.common.response.Response;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.media.SchemaProperty;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;

@Tag(name = "8. 꼬리질문 관련 API", description = "꼬리질문을 생성하고 조회하는 API")
public interface FollowUpQuestionControllerDocs {

    @Operation(summary = "꼬리질문 생성", description = "질문에 대한 꼬리질문을 생성하는 API를 호출한다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "성공시 생성한 꼬리질문을 반환한다.",
                    content = @Content(schemaProperties = {
                            @SchemaProperty(name = "result", schema = @Schema(defaultValue = "ok", description = "요청 성공")),
                            @SchemaProperty(name = "data", schema = @Schema(implementation = FollowUpQuestionResponse.class))
                    }))
    })
    Response get(@Valid FollowUpQuestionDto.Request requestDto);


    class FollowUpQuestionResponse { public FollowUpQuestionDto.Response followUpQuestion; }

}
