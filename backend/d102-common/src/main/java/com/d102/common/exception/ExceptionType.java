package com.d102.common.exception;

import lombok.Getter;

@Getter
public enum ExceptionType {

    /* Invalid request */
    InvalidParamException("INVALID", "Invalid param"),

    /* Upload exception */
    ProfileUploadException("INVALID", "Profile upload failed"),

    /* Download exception */
    ProfileDownloadException("NOT FOUND", "Profile download failed"),
    
    /* UnAuthorize request */
    InvalidLoginUserException("UNAUTHORIZED", "Invalid email or password"),
    DisabledUserException("UNAUTHORIZED", "Disabled user"),
    UnAuthorizedTokenException("UNAUTHORIZED", "UnAuthorized Token"),

    /* Forbidden request */
    InaccessibleException("FORBIDDEN", "Inaccessible"),

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
