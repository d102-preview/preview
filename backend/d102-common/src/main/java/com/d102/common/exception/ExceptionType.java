package com.d102.common.exception;

import lombok.Getter;

@Getter
public enum ExceptionType {

    /* Invalid request */
    InvalidParamException("INVALID", "Invalid param"),

    /* Profile upload exception */
    ProfileUploadException("INVALID", "Profile upload failed"),

    /* Not found request */
    EmailHashNotFoundException("NOT FOUND", "Invalid email"),

    /* Conflict exception */
    EmailExistedException("CONFLICT", "Email already exists"),

    /* Too many request exception */
    EmailSendLimitException("TOO MANY REQUEST", "Limits for mail sending");

    private final String code;
    private final String message;

    ExceptionType(String code, String message) {
        this.code = code;
        this.message = message;
    }

}
