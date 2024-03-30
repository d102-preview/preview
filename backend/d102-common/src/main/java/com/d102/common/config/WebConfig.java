package com.d102.common.config;

import com.d102.common.util.OctetStreamMessageConverter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.util.List;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    private OctetStreamMessageConverter octetStreamMessageConverter;

    @Autowired
    public WebConfig(OctetStreamMessageConverter octetStreamMessageConverter) {
        this.octetStreamMessageConverter = octetStreamMessageConverter;
    }

    @Override
    public void configureMessageConverters(List<HttpMessageConverter<?>> converters) {
        converters.add(octetStreamMessageConverter);
    }

}
