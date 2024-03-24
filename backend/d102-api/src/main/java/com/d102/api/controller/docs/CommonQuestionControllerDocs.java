package com.d102.api.controller.docs;

import com.d102.api.dto.CommonKeywordDto;
import com.d102.api.dto.CommonQuestionDto;
import com.d102.api.dto.CommonScriptDto;
import com.d102.common.response.Response;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.media.SchemaProperty;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.data.domain.Pageable;

@Tag(name = "4. 공통 질문 관련 API", description = "공통 질문 관련 정보를 CRUD 하는 API")
public interface CommonQuestionControllerDocs {

    @Operation(summary = "공통 질문 목록 조회", description = "공통 질문 목록을 조회하는 API를 호출한다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "성공시 공통 질문 리스트를 반환한다.",
                    content = @Content(schemaProperties = {
                            @SchemaProperty(name = "result", schema = @Schema(defaultValue = "ok", description = "요청 성공")),
                            @SchemaProperty(name = "data", schema = @Schema(implementation = CommonQuestionDto.ListResponse.class)),
                    }))
    })
    Response getList(Pageable pageable);

    @Operation(summary = "공통 질문 상세 조회", description = "공통 질문 상세 조회하는 API를 호출한다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "성공시 공통 질문과 질문 스크립트, 키워드를 반환한다.",
                    content = @Content(schemaProperties = {
                            @SchemaProperty(name = "result", schema = @Schema(defaultValue = "ok", description = "요청 성공")),
                            @SchemaProperty(name = "data", schema = @Schema(implementation = CommonQuestionDto.Response.class)),
                    }))
    })
    Response get(Long commonQuestionId);

    @Operation(summary = "공통 질문 스크립트 작성", description = "공통 질문에 관한 스크립트를 작성하는 API를 호출한다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "성공시 ok를 반환한다.",
                    content = @Content(schemaProperties = {
                            @SchemaProperty(name = "result", schema = @Schema(defaultValue = "ok", description = "요청 성공")),
                    }))
    })
    Response writeScript(Long commonQuestionId, CommonScriptDto.Request request);

    @Operation(summary = "공통 질문 키워드 작성", description = "공통 질문에 관한 키워드를 작성하는 API를 호출한다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "성공시 ok를 반환한다.",
                    content = @Content(schemaProperties = {
                            @SchemaProperty(name = "result", schema = @Schema(defaultValue = "ok", description = "요청 성공")),
                    }))
    })
    Response createKeyword(Long commonQuestionId, CommonKeywordDto.Request request);

    @Operation(summary = "공통 질문 키워드 수정", description = "공통 질문에 관한 키워드를 수정하는 API를 호출한다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "성공시 ok를 반환한다.",
                    content = @Content(schemaProperties = {
                            @SchemaProperty(name = "result", schema = @Schema(defaultValue = "ok", description = "요청 성공")),
                    }))
    })
    Response updateKeyword(Long commonKeywordId, CommonKeywordDto.Request request);

    @Operation(summary = "공통 질문 키워드 삭제", description = "공통 질문에 관한 키워드를 삭제하는 API를 호출한다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "성공시 ok를 반환한다.",
                    content = @Content(schemaProperties = {
                            @SchemaProperty(name = "result", schema = @Schema(defaultValue = "ok", description = "요청 성공")),
                    }))
    })
    Response deleteKeyword(Long commonKeywordId);

}
