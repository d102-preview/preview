package com.d102.api.controller.docs;

import com.d102.api.dto.EmailDto;
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
@Tag(name = "1. 이메일 관련 API", description = "JWT 토큰을 요구하지 않는 API (이메일 인증번호 전송, 이메일 중복확인 등)")
public interface EmailControllerDocs {

    @Operation(summary = "이메일 중복확인", description = "이메일 중복확인 API를 호출한다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "성공시 이메일 사용 가능여부를 반환한다.",
                    content = @Content(schemaProperties = {
                            @SchemaProperty(name = "result", schema = @Schema(defaultValue = "ok", description = "요청 성공")),
                            @SchemaProperty(name = "data", schema = @Schema(defaultValue = "사용가능 여부", description = "true: 사용 가능, false: 사용 불가")),
                    }))
    })
    Response checkAvailableEmail(
            @NotBlank(message = "not blank")
            @Email(message = "not email form")
            @Size(max = 64, message = "email max length is 64") String email
    );

    @Operation(summary = "이메일 인증번호 전송", description = "회원가입에 필요한 인증번호 전송한다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "성공시 이메일 전송 성공 여부를 반환한다.",
                    content = @Content(schemaProperties = {
                            @SchemaProperty(name = "result", schema = @Schema(defaultValue = "ok", description = "요청 성공")),
                            @SchemaProperty(name = "data", schema = @Schema(defaultValue = "전송 성공 여부", description = "true: 전송 성공, false: 전송 불가")),
                    }))
    })
    Response sendAuthorizationCode(@Valid EmailDto.Request requestDto);

}
