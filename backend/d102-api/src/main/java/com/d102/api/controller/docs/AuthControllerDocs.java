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
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;

@Tag(name = "02. 인증 관련 API", description = "JWT 토큰을 요구하지 않는 API (회원가입, 로그인 등)")
public interface AuthControllerDocs {

    @Operation(summary = "회원가입", description = "회원가입에 필요한 API를 호출한다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "성공시 가입한 정보를 반환한다.",
                    content = @Content(schemaProperties = {
                            @SchemaProperty(name = "result", schema = @Schema(defaultValue = "ok", description = "요청 성공")),
                            @SchemaProperty(name = "data", schema = @Schema(implementation = UserResponse.class)),
                    }))
    })
    Response join(@Valid UserDto.JoinRequest joinRequestDto);

    @Operation(summary = "로그인", description = "로그인에 필요한 API를 호출한다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "성공시 로그인한 유저 정보를 반환한다.",
                    content = @Content(schemaProperties = {
                            @SchemaProperty(name = "result", schema = @Schema(defaultValue = "ok", description = "요청 성공")),
                            @SchemaProperty(name = "data", schema = @Schema(implementation = UserResponse.class)),
                    }))
    })
    Response login(@Valid UserDto.LoginRequest loginRequestDto, HttpServletResponse servletResponse);


    class UserResponse { public UserDto.Response user; }

}

