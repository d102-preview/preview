package com.d102.api.controller.docs;

import com.d102.api.dto.ResumeKeywordDto;
import com.d102.api.dto.ResumeQuestionDto;
import com.d102.api.dto.ResumeScriptDto;
import com.d102.common.response.Response;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.media.SchemaProperty;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.data.domain.Pageable;

import java.util.List;

@Tag(name = "06. 이력서 기반 질문 관련 API", description = "이력서 기반 질문 관련 정보를 CRUD 하는 API")
public interface ResumeQuestionControllerDocs {

    @Operation(summary = "이력서 기반 질문 목록 조회", description = "이력서 기반 질문 목록을 조회하는 API를 호출한다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "성공시 이력서 기반 질문 리스트를 반환한다.",
                    content = @Content(schemaProperties = {
                            @SchemaProperty(name = "result", schema = @Schema(defaultValue = "ok", description = "요청 성공")),
                            @SchemaProperty(name = "data", schema = @Schema(implementation = QuestionListResponse.class)),
                    }))
    })
    Response getList(Long resumeId, Pageable pageable);

    @Operation(summary = "이력서 기반 질문 상세 조회", description = "이력서 기반 질문 상세 조회하는 API를 호출한다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "성공시 이력서 기반 질문과 질문 스크립트, 키워드를 반환한다.",
                    content = @Content(schemaProperties = {
                            @SchemaProperty(name = "result", schema = @Schema(defaultValue = "ok", description = "요청 성공")),
                            @SchemaProperty(name = "data", schema = @Schema(implementation = QuestionDetailResponse.class)),
                    }))
    })
    Response get(Long resumeQuestionId);

    @Operation(summary = "이력서 기반 질문 삭제", description = "이력서 기반 질문을 삭제하는 API를 호출한다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "성공시 ok를 반환한다.",
                    content = @Content(schemaProperties = {
                            @SchemaProperty(name = "result", schema = @Schema(defaultValue = "ok", description = "요청 성공")),
                    }))
    })
    Response deleteResumeQuestion(Long resumeQuestionId);

    @Operation(summary = "이력서 기반 질문 스크립트 작성", description = "이력서 기반 질문에 관한 스크립트를 작성하는 API를 호출한다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "성공시 이력서 기반 질문과 질문 스크립트, 키워드를 반환한다.",
                    content = @Content(schemaProperties = {
                            @SchemaProperty(name = "result", schema = @Schema(defaultValue = "ok", description = "요청 성공")),
                            @SchemaProperty(name = "data", schema = @Schema(implementation = QuestionScriptResponse.class)),
                    }))
    })
    Response writeScript(Long resumeQuestionId, @Valid ResumeScriptDto.Request requestDto);

    @Operation(summary = "이력서 기반 질문 키워드 작성", description = "이력서 기반 질문에 관한 키워드를 작성하는 API를 호출한다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "성공시 이력서 기반 질문과 질문 스크립트, 키워드를 반환한다.",
                    content = @Content(schemaProperties = {
                            @SchemaProperty(name = "result", schema = @Schema(defaultValue = "ok", description = "요청 성공")),
                            @SchemaProperty(name = "data", schema = @Schema(implementation = QuestionKeywordResponse.class)),
                    }))
    })
    Response createKeyword(Long resumeQuestionId, @Valid ResumeKeywordDto.Request requestDto);

    @Operation(summary = "이력서 기반 질문 키워드 수정", description = "이력서 기반 질문에 관한 키워드를 수정하는 API를 호출한다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "성공시 이력서 기반 질문과 질문 스크립트, 키워드를 반환한다.",
                    content = @Content(schemaProperties = {
                            @SchemaProperty(name = "result", schema = @Schema(defaultValue = "ok", description = "요청 성공")),
                            @SchemaProperty(name = "data", schema = @Schema(implementation = QuestionKeywordResponse.class)),
                    }))
    })
    Response updateKeyword(Long resumeKeywordId, @Valid ResumeKeywordDto.Request requestDto);

    @Operation(summary = "이력서 기반  질문 키워드 삭제", description = "이력서 기반  질문에 관한 키워드를 삭제하는 API를 호출한다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "성공시 ok를 반환한다.",
                    content = @Content(schemaProperties = {
                            @SchemaProperty(name = "result", schema = @Schema(defaultValue = "ok", description = "요청 성공")),
                    }))
    })
    Response deleteKeyword(Long resumeKeywordId);
    
    
    class QuestionListResponse { public List<ResumeQuestionDto.ListResponse> questionList; }
    class QuestionDetailResponse { public ResumeQuestionDto.Response questionDetail; }
    class QuestionScriptResponse { public ResumeScriptDto.Response script; }
    class QuestionKeywordResponse { public List<ResumeKeywordDto.Response> keywordList; }

}
