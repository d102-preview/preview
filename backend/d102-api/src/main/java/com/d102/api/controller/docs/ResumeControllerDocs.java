package com.d102.api.controller.docs;

import com.d102.api.dto.ResumeDto;
import com.d102.common.response.Response;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.media.SchemaProperty;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;

import java.util.List;

@Tag(name = "4. 이력서 관련 API", description = "이력서 관련 정보를 CRUD 하는 API")
public interface ResumeControllerDocs {

    @Operation(summary = "내 이력서 목록 조회", description = "로그인한 정보를 기반으로 자신의 이력서 목록을 조회하는 API를 호출한다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "성공시 자신의 이력서 목록을 반환한다.",
                    content = @Content(schemaProperties = {
                            @SchemaProperty(name = "result", schema = @Schema(defaultValue = "ok", description = "요청 성공")),
                            @SchemaProperty(name = "data", schema = @Schema(implementation = ResumeListResponse.class)),
                    }))
    })
    Response getList();


    class ResumeListResponse { public List<ResumeDto.ListResponse> resumeList; }

}
