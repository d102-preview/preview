package com.d102.common.util;

import lombok.Data;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Component
public class FastAiApi {

    @Value("${fast-ai.url}")
    private String FASTAI_API_URL;

    public FastAiApi.Response analyzeVideo(Long analysisId) {
        StringBuilder analysisIdJson = new StringBuilder();
        analysisIdJson.append(analysisId);

        HttpHeaders headers = new HttpHeaders();
        headers.set(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE);

        HttpEntity<Map> request = getAnalyzeVideoHttpEntity(analysisIdJson, headers);
        return new RestTemplate().postForObject(FASTAI_API_URL, request, FastAiApi.Response.class);
    }

    private HttpEntity<Map> getAnalyzeVideoHttpEntity(StringBuilder analysisIdJson, HttpHeaders headers) {
//        String payloadTemplate = "{ \"analysis_id\": \"%s\" }";
        HashMap<String, Integer> map = new HashMap<>() {{
            put("analysis_id", 36);
        }};
//        String payload = String.format(payloadTemplate, analysisIdJson.toString());

        return new HttpEntity<>(map, headers);
    }

    @Data
    public static class Response {

        private String result;
        private String code;
        private String message;
        private Object data;
    }

}
