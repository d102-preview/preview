package com.d102.file.controller;

import com.d102.file.controller.docs.DownloadControllerDocs;
import com.d102.file.dto.DownloadDto;
import com.d102.file.service.DownloadService;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.security.web.util.UrlUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.net.URLDecoder;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.nio.file.Path;

@RequestMapping("/download")
@RequiredArgsConstructor
@RestController
public class DownloadController implements DownloadControllerDocs {

    private final DownloadService downloadService;

    @GetMapping(value = "/profile")
    public ResponseEntity<ByteArrayResource> downloadProfile(@RequestParam(value = "path") String profilePath) {
        String decodedPath = URLDecoder.decode(profilePath, StandardCharsets.UTF_8);
        DownloadDto.ProfileResponse profileResponseDto = downloadService.downloadProfile(Path.of(decodedPath));
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_TYPE, profileResponseDto.getProfileType())
                .body(new ByteArrayResource(profileResponseDto.getProfile()));
    }

    // download pdf file
    @GetMapping(value = "/resume")
    public ResponseEntity<ByteArrayResource> downloadResume(@RequestParam("id") Long resumeId) {
        DownloadDto.ResumeResponse resumeResponseDto = downloadService.downloadResume(resumeId);
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=" + URLEncoder.encode(resumeResponseDto.getName(), StandardCharsets.UTF_8))
                .header(HttpHeaders.CONTENT_LENGTH, resumeResponseDto.getLength())
                .header(HttpHeaders.CONTENT_TYPE, resumeResponseDto.getResumeType())
                .body(new ByteArrayResource(resumeResponseDto.getResume()));
    }

}
