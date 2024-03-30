package com.d102.common.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.AsyncConfigurer;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.concurrent.ThreadPoolTaskExecutor;
import org.springframework.security.task.DelegatingSecurityContextAsyncTaskExecutor;

import java.util.concurrent.Executor;
import java.util.concurrent.ThreadPoolExecutor;

@Configuration
@EnableAsync
public class AsyncConfig implements AsyncConfigurer {

    @Override
    @Bean(name = "asyncExecutor")
    public Executor getAsyncExecutor() {
        ThreadPoolTaskExecutor executor = new ThreadPoolTaskExecutor();
        executor.setCorePoolSize(10);
        executor.setMaxPoolSize(20);
        executor.setQueueCapacity(50);
        executor.setKeepAliveSeconds(120);
        executor.setThreadNamePrefix("async-thread-");
        executor.setRejectedExecutionHandler(new ThreadPoolExecutor.CallerRunsPolicy());
        executor.initialize();

        /**
         * SecurityContext는 기본적으로 ThreadLocal하게 관리됨
         * 따라서 별도의 설정을 해주지 않으면 비동기 처리 시 자식 스레드에서는 부모 스레드의 SecurityContext를 참조할 수 없음
         * 이를 해결하기 위해 new DelegatingSecurityContextAsyncTaskExecutor(executor)를 사용하여 부모 스레드의 SecurityContext를 자식 스레드로 전파
         * 지금 당장에는 쓸 일이 없어서 일반 executor를 반환
         */
        return executor;
    }

}