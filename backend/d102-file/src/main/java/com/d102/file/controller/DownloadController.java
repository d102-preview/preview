package com.d102.file.controller;

import com.d102.common.constant.DownloadConstant;
import com.d102.common.response.Response;
import com.d102.file.controller.docs.DownloadControllerDocs;
import com.d102.file.dto.DownloadDto;
import com.d102.file.service.DownloadService;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.nio.file.Paths;

@RequestMapping("/download")
@RequiredArgsConstructor
@RestController
public class DownloadController implements DownloadControllerDocs {

    private final DownloadService downloadService;

    @GetMapping(value = "/profile/image")
    public ResponseEntity<ByteArrayResource> downloadProfile(@RequestParam("url") String profileUrl) {
        DownloadDto.ProfileResponse profileResponseDto = downloadService.downloadProfile(Paths.get(profileUrl));
        return ResponseEntity.ok()
                .contentType(profileResponseDto.getProfileType())
                .body(new ByteArrayResource(profileResponseDto.getProfile()));
    }

}
