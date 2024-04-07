package com.d102.file.controller.docs;

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

@Tag(name = "04. SSE 관련 API", description = "SSE 연결 및 테스트 API")
public interface SseControllerDocs {

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

}
