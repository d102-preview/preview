package com.d102.api.controller.docs;

import com.d102.api.dto.AnalysisDto;
import com.d102.common.constant.InterviewType;
import com.d102.common.response.Response;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.media.SchemaProperty;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.data.domain.Pageable;

import java.util.List;

@Tag(name = "10. 분석 결과 관련 API", description = "분석 결과를 조회하는 API")
public interface AnalysisControllerDocs {

    @Operation(summary = "분석 결과 목록 조회", description = "분석 결과 목록 API를 호출한다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "성공시 분석 결과 목록을 반환한다.",
                    content = @Content(schemaProperties = {
                            @SchemaProperty(name = "result", schema = @Schema(defaultValue = "ok", description = "요청 성공")),
                            @SchemaProperty(name = "data", schema = @Schema(implementation = InterviewListResponse.class)),
                    }))
    })
    Response getList(String type, Pageable pageable);

    @Operation(summary = "분석 결과 상세 조회", description = "분석 결과 상세 조회 API를 호출한다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "성공시 분석 결과 상세를 반환한다.",
                    content = @Content(schemaProperties = {
                            @SchemaProperty(name = "result", schema = @Schema(defaultValue = "ok", description = "요청 성공")),
                            @SchemaProperty(name = "data", schema = @Schema(implementation = AnalysisDetailResponse.class)),
                    }))
    })
    Response get(Long id);


    class InterviewListResponse { public List<AnalysisDto.ListResponse> interviewList; }
    class AnalysisDetailResponse { public AnalysisDto.DetailResponse analysisDetail; }

}
