package com.d102.file.controller.docs;

import com.d102.common.response.Response;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.media.SchemaProperty;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;

@Tag(name = "03. 파일 관리 관련 API", description = "파일을 관리할 수 있는 API")
public interface ManageControllerDocs {

    @Operation(summary = "이력서 삭제", description = "이력서를 삭제한다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "성공시 이력서를 삭제한다.",
                    content = @Content(schemaProperties = {
                            @SchemaProperty(name = "result", schema = @Schema(defaultValue = "ok", description = "요청 성공"))
                    }))
    })
    Response deleteResume(Long resumeId);

}
