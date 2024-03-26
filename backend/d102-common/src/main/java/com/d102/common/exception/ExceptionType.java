package com.d102.common.exception;

import lombok.Getter;

@Getter
public enum ExceptionType {

    /* Invalid request */
    InvalidParamException("INVALID", "Invalid param"),
    ProfileUploadException("INVALID", "Profile upload failed"),
    ProfileUrlException("INVALID", "Invalid profile name"),
    ResumeUploadException("INVALID", "Resume upload failed"),
    ResumeLimitException("INVALID", "Resume limit exceeded"),

    /* UnAuthorize request */
    InvalidLoginUserException("UNAUTHORIZED", "Invalid email or password"),
    DisabledUserException("UNAUTHORIZED", "Disabled user"),
    UnAuthorizedTokenException("UNAUTHORIZED", "UnAuthorized Token"),
    InvalidCurrentPasswordException("UNAUTHORIZED", "Invalid current password"),
    WrongChangedPasswordException("UNAUTHORIZED", "Wrong changedPassword and checkChangePassword"),
    NotVerifyUserException("UNAUTHORIZED", "Not verify user"),

    /* Forbidden request */
    InaccessibleException("FORBIDDEN", "Inaccessible"),

    /* Not found request */
    EmailHashNotFoundException("NOT FOUND", "Invalid email"),
    LoginUserNotFoundException("NOT FOUND", "Invalid email or password"),
    UserNotFoundException("NOT FOUND", "Invalid user"),
    CommonQuestionNotFoundException("NOT FOUND", "Invalid common question"),
    CommonKeywordNotFoundException("NOT FOUND", "Invalid common keyword"),
    ProfileDownloadException("NOT FOUND", "Profile download failed"),
    ResumeDownloadException("NOT FOUND", "Resume download failed"),
    ResumeNotFoundException("NOT FOUND", "Resume not found"),
    ResumeDeleteException("NOT FOUND", "Resume delete failed"),

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
