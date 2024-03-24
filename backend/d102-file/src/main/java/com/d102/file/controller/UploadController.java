package com.d102.file.controller;

import com.d102.common.constant.UploadConstant;
import com.d102.common.response.Response;
import com.d102.file.controller.docs.UploadControllerDocs;
import com.d102.file.dto.UploadDto;
import com.d102.file.service.UploadService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RequestMapping("/upload")
@RequiredArgsConstructor
@RestController
public class UploadController implements UploadControllerDocs {

    private final UploadService uploadService;

    @PostMapping(value = "/profile", consumes = MediaType.MULTIPART_FORM_DATA_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public Response uploadProfile(@ModelAttribute UploadDto.ProfileRequest profileRequestDto) {
        return new Response(UploadConstant.PROFILE, uploadService.uploadProfile(profileRequestDto));
    }

    // pdf
    @PostMapping(value = "/resume", consumes = MediaType.MULTIPART_FORM_DATA_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public Response uploadResume(UploadDto.ResumeRequest resumeRequestDto) {
        return new Response(UploadConstant.RESUME, uploadService.uploadResume(resumeRequestDto));
    }

}
