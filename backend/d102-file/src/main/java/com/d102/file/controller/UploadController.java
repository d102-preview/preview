package com.d102.file.controller;

import com.d102.common.response.Response;
import com.d102.file.controller.docs.UploadControllerDocs;
import com.d102.file.dto.UploadDto;
import com.d102.file.service.UploadService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("/upload")
@RequiredArgsConstructor
@RestController
public class UploadController implements UploadControllerDocs {

    private final UploadService uploadService;

    @PostMapping("/profile/image")
    public Response uploadProfileImage(@RequestBody UploadDto.ImageRequest imageRequestDto) {
        return new Response("data", uploadService.uploadProfileImage(imageRequestDto));
    }

}
