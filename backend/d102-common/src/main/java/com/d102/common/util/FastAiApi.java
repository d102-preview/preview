package com.d102.common.util;

import lombok.Data;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import java.util.List;

@Component
public class FastAiApi {

    @Value("${fast-ai.url}")
    private String FASTAI_API_URL;

    public ResponseEntity<Void> analyzeVideo(Long analysisId) {
        StringBuilder analysisIdJson = new StringBuilder();
        analysisIdJson.append(analysisId);

        HttpHeaders headers = new HttpHeaders();
        headers.set(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE);

        HttpEntity<String> request = getAnalyzeVideoHttpEntity(analysisIdJson, headers);

        return new RestTemplate().exchange(FASTAI_API_URL, HttpMethod.POST, request, Void.class);
    }

    private HttpEntity<String> getAnalyzeVideoHttpEntity(StringBuilder analysisIdJson, HttpHeaders headers) {
        String payloadTemplate = "{ \"analysis_id\": \"%s\" }";
        String payload = String.format(payloadTemplate, analysisIdJson.toString());

        return new HttpEntity<>(payload, headers);
    }

}
