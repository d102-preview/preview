package com.d102.file.controller.docs;

import com.d102.common.response.Response;
import com.d102.file.dto.DownloadDto;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.media.SchemaProperty;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

@Tag(name = "02. 파일 다운로드 관련 API", description = "파일을 다운로드 할 수 있는 API")
public interface DownloadControllerDocs {

    @Operation(summary = "프로필 이미지 다운로드", description = "프로필 이미지를 다운로드한다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "성공시 다운로드한 프로필 이미지를 반환한다.",
                    content = @Content(schema = @Schema(implementation = ByteArrayResource.class), mediaType = "image/jpg"
                    )),
    })
    ResponseEntity<ByteArrayResource> downloadProfile(String profilePath);

    @Operation(summary = "이력서 다운로드", description = "이력서를 다운로드한다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "성공시 이력서를 다운로드한다.",
                    content = @Content(schema = @Schema(implementation = ByteArrayResource.class), mediaType = "application/pdf"
                    )),
    })
    ResponseEntity<ByteArrayResource> downloadResume(Long resumeId);


}
