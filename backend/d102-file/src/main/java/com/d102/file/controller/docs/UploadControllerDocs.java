package com.d102.file.controller.docs;

import com.d102.common.response.Response;
import com.d102.file.dto.UploadDto;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.media.SchemaProperty;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Tag(name = "1. 파일 업로드 관련 API", description = "파일을 업로드할 수 있는 API")
public interface UploadControllerDocs {

    @Operation(summary = "프로필 이미지 업로드", description = "프로필 이미지를 업로드한다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "성공시 업로드한 프로필 이미지 URL을 반환한다.",
                    content = @Content(schemaProperties = {
                            @SchemaProperty(name = "result", schema = @Schema(defaultValue = "ok", description = "요청 성공")),
                            @SchemaProperty(name = "data", schema = @Schema(implementation = UploadDto.ProfileResponse.class)),
                    }))
    })
    Response uploadProfile(UploadDto.ProfileRequest profileRequestDto);

}
