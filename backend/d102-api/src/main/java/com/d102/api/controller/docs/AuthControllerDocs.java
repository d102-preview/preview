package com.d102.api.controller.docs;

import com.d102.common.response.Response;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.media.SchemaProperty;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;

@Tag(name = "1. 인증관련 API", description = "JWT 토큰을 요구하지 않는 API (회원가입, 이메일 중복확인 등)")
public interface AuthControllerDocs {

    @Operation(summary = "회원가입", description = "회원가입을 진행한다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "회원 가입 성공",
                    content = @Content(schemaProperties = {
                            @SchemaProperty(name = "result", schema = @Schema(defaultValue = "ok", description = "요청 성공")),
                            @SchemaProperty(name = "isNicknameDuplicate", schema = @Schema(description = "중복 여부", example = "false")),
                    }))
    })
    Response join();
}
