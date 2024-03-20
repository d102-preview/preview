package com.d102.common.exception;

import lombok.Getter;

@Getter
public enum ExceptionType {

    // invalid request
    InvalidParamException("INVALID", "Invalid param"),

    // conflict exception
    EmailExistedException("CONFLICT", "Email already exists");


    private final String code;
    private final String message;

    ExceptionType (String code, String message) {
        this.code = code;
        this.message = message;
    }

}
