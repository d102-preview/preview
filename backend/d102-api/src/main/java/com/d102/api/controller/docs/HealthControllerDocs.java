package com.d102.api.controller.docs;

import com.d102.common.response.Response;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.media.SchemaProperty;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;

@Tag(name = "00. 서버 상태 관련 API", description = "배포 시 서버의 상태를 확인하는 API")
public interface HealthControllerDocs {

    @Operation(summary = "서버 상태 확인", description = "서버의 상태를 확인한다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "서버 상태 확인 성공",
                    content = @Content(schemaProperties = {
                            @SchemaProperty(name = "result", schema = @Schema(defaultValue = "ok", description = "요청 성공")),
                    })
            )
    })
    Response checkHealth();

}
