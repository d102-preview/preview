package com.d102.file.controller;

import com.d102.common.constant.FileConstant;
import com.d102.common.response.Response;
import com.d102.file.controller.docs.UploadControllerDocs;
import com.d102.file.dto.UploadDto;
import com.d102.file.service.UploadService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

@RequestMapping("/upload")
@RequiredArgsConstructor
@RestController
public class UploadController implements UploadControllerDocs {

    private final UploadService uploadService;

    @PostMapping(value = "/profile", consumes = MediaType.MULTIPART_FORM_DATA_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public Response uploadProfile(@ModelAttribute UploadDto.ProfileRequest profileRequestDto) {
        return new Response(FileConstant.PROFILE, uploadService.uploadProfile(profileRequestDto));
    }

    @PostMapping(value = "/resume", consumes = MediaType.MULTIPART_FORM_DATA_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public Response uploadResume(@ModelAttribute UploadDto.ResumeRequest resumeRequestDto) {
        return new Response(FileConstant.RESUME, uploadService.uploadResume(resumeRequestDto));
    }

    @PostMapping(value = "/video", consumes = MediaType.MULTIPART_FORM_DATA_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public Response uploadVideo(@ModelAttribute UploadDto.VideoRequest videoRequestDto) {
        uploadService.uploadVideo(videoRequestDto);
        return new Response();
    }

}
