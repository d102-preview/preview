package com.d102.api.controller.docs;

import com.d102.api.dto.request.JoinDto;
import com.d102.common.response.Response;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.media.SchemaProperty;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import org.springframework.validation.annotation.Validated;

@Validated
@Tag(name = "1. 인증 관련 API", description = "JWT 토큰을 요구하지 않는 API (회원가입, 이메일 중복확인 등)")
public interface AuthControllerDocs {

    @Operation(summary = "이메일 중복확인", description = "이메일의 중복을 확인한다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "이메일 중복 여부 판단",
                    content = @Content(schemaProperties = {
                            @SchemaProperty(name = "result", schema = @Schema(defaultValue = "ok", description = "요청 성공")),
                            @SchemaProperty(name = "isDuplicateEmail", schema = @Schema(defaultValue = "true", description = "중복으로 사용 불가")),
                    }))
    })
    Response checkDuplicatedEmail(@NotBlank(message = "not blank")
                                  @Email(message = "not email form")
                                  @Size(max = 64, message = "email max length is 64") String email);

    @Operation(summary = "회원가입", description = "회원가입 API를 호출한다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "회원",
                    content = @Content(schemaProperties = {
                            @SchemaProperty(name = "result", schema = @Schema(defaultValue = "ok", description = "요청 성공")),
                            @SchemaProperty(name = "message", schema = @Schema(defaultValue = "join success", description = "회원 가입 성공")),
                    }))
    })
    Response join(@Valid JoinDto joinDto);

}
