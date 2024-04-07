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
import org.springframework.http.ResponseEntity;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

@Tag(name = "07. 작업 완료 여부 관련 API", description = "작업 완료 여부를 조회하는 API")
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

    @Operation(summary = "면접 영상 분석 작업 완료 여부 조회", description = "면접 영상 분석 작업 완료 여부를 조회하는 API를 호출한다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "성공시 면접 영상 분석 작업 완료 여부를 반환한다.",
                    content = @Content(schemaProperties = {
                            @SchemaProperty(name = "result", schema = @Schema(defaultValue = "ok", description = "요청 성공")),
                            @SchemaProperty(name = "data", schema = @Schema(implementation = CompleteResponse.class))
                    }))
    })
    Response checkAnalysisTask(@NotNull(message = "not null") Long analysisId);

    @Operation(summary = "SSE 연결 V1 (JWT 토큰 기반)", description = "SSE 연결을 위한 API를 호출한다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "성공시 SSE 연결을 위한 SseEmitter 객체를 반환한다.",
                    content = @Content(schema = @Schema(implementation = SseEmitter.class))
            )
    })
    ResponseEntity<SseEmitter> connectSseV1();

    @Operation(summary = "SSE 연결 V2 (URL 패러미터 기반)", description = "SSE 연결을 위한 API를 호출한다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "성공시 SSE 연결을 위한 SseEmitter 객체를 반환한다.",
                    content = @Content(schema = @Schema(implementation = SseEmitter.class))
            )
    })
    ResponseEntity<SseEmitter> connectSseV2(@NotNull(message = "not null") String email);

    @Operation(summary = "SSE 테스트", description = "SSE 테스트를 위한 API를 호출한다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "성공시 SSE 테스트 결과를 반환한다.",
                    content = @Content(schemaProperties = {
                            @SchemaProperty(name = "result", schema = @Schema(defaultValue = "ok", description = "요청 성공"))
                    }))
    })
    Response sendNotification();


    class CompleteResponse { public Boolean complete; }

}
