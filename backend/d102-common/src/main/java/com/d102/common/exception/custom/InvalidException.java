package com.d102.common.exception.custom;

import com.d102.common.exception.ExceptionType;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public class InvalidException extends RuntimeException {

    private final ExceptionType exceptionType;

    @Override
    public String getMessage() {
        return exceptionType.getMessage();
    }

}
