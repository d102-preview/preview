package com.d102.api.controller.docs;

import com.d102.api.dto.UserDto;
import com.d102.common.response.Response;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.media.SchemaProperty;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;

@Tag(name = "3. 유저 관련 API", description = "유저 관련 정보를 CRUD 하는 API")
public interface UserControllerDocs {

    @Operation(summary = "내 정보 조회", description = "로그인한 정보를 기반으로 자신의 정보를 조회하는 API를 호출한다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "성공시 자신의 정보를 반환한다.",
                    content = @Content(schemaProperties = {
                            @SchemaProperty(name = "result", schema = @Schema(defaultValue = "ok", description = "요청 성공")),
                            @SchemaProperty(name = "data", schema = @Schema(implementation = UserDto.Response.class)),
                    }))
    })
    Response get();

}
