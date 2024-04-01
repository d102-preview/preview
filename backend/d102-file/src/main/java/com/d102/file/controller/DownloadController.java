package com.d102.file.controller;

import com.d102.file.controller.docs.DownloadControllerDocs;
import com.d102.file.dto.DownloadDto;
import com.d102.file.service.DownloadService;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.web.util.UrlUtils;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.method.annotation.StreamingResponseBody;

import java.io.FileInputStream;
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

    @GetMapping(value = "/resume/{resumeId}")
    public ResponseEntity<ByteArrayResource> downloadResume(@PathVariable("resumeId") Long resumeId) {
        DownloadDto.ResumeResponse resumeResponseDto = downloadService.downloadResume(resumeId);
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=" + URLEncoder.encode(resumeResponseDto.getResumeName(), StandardCharsets.UTF_8))
                .header(HttpHeaders.CONTENT_LENGTH, resumeResponseDto.getResumeLength())
                .header(HttpHeaders.CONTENT_TYPE, resumeResponseDto.getResumeType())
                .body(new ByteArrayResource(resumeResponseDto.getResume()));
    }

    @GetMapping(value = "/thumbnail")
    public ResponseEntity<ByteArrayResource> downloadThumbnail(@RequestParam(value = "path") String thumbnailPath) {
        String decodedPath = URLDecoder.decode(thumbnailPath, StandardCharsets.UTF_8);
        DownloadDto.ThumbnailResponse thumbnailResponse = downloadService.downloadThumbnail(Path.of(decodedPath));
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_TYPE, thumbnailResponse.getThumbnailType())
                .body(new ByteArrayResource(thumbnailResponse.getThumbnail()));
    }

    @GetMapping(value = "/video", produces = MediaType.APPLICATION_OCTET_STREAM_VALUE)
    public ResponseEntity<ByteArrayResource> downloadVideo(@RequestParam(value = "path") String videoPath) {
        String decodedPath = URLDecoder.decode(videoPath, StandardCharsets.UTF_8);
        DownloadDto.VideoResponse videoResponse = downloadService.downloadVideo(Path.of(decodedPath));
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_OCTET_STREAM_VALUE)
                .body(new ByteArrayResource(videoResponse.getVideo()));
    }

}
