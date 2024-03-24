package com.d102.file.controller;

import com.d102.common.constant.DownloadConstant;
import com.d102.common.response.Response;
import com.d102.file.controller.docs.DownloadControllerDocs;
import com.d102.file.service.DownloadService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

@RequestMapping("/download")
@RequiredArgsConstructor
@RestController
public class DownloadController implements DownloadControllerDocs {

    private final DownloadService downloadService;

    @GetMapping(value = "/profile/image")
    // query parameter로 받아서 처리
    public Response downloadProfile(@RequestParam("url") String profileUrl) {
        return new Response(DownloadConstant.PROFILE, downloadService.downloadProfile(profileUrl));
    }

}
