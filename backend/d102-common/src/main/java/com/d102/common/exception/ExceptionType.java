package com.d102.common.exception;

import lombok.Getter;

@Getter
public enum ExceptionType {

    /* Invalid request */
    InvalidParamException("INVALID", "Invalid param"),

    /* UnAuthorize request */
    InvalidLoginUserException("UnAuthorize", "Invalid email or password"),
    DisabledUserException("UnAuthorize", "Disabled user"),
    UnAuthorizedTokenException("UnAuthorize", "UnAuthorized Token"),

    /* Forbidden request */
    InaccessibleException("Forbidden", "Inaccessible"),

    /* Not found request */
    EmailHashNotFoundException("NOT FOUND", "Invalid email"),
    LoginUserNotFoundException("NOT FOUND", "Invalid email or password"),
    UserNotFoundException("NOT FOUND", "Invalid user"),

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
