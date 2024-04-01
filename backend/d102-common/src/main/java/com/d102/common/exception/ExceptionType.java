package com.d102.common.exception;

import lombok.Getter;

@Getter
public enum ExceptionType {

    /* Invalid exception */
    InvalidParamException("INVALID", "Invalid param"),
    ProfileUploadException("INVALID", "Profile upload failed"),
    ProfileUrlException("INVALID", "Invalid profile name"),
    ResumeUploadException("INVALID", "Resume upload failed"),
    ResumeLimitException("INVALID", "Resume limit exceeded"),
    PdfConvertException("INVALID", "Pdf convert failed"),
    OpenAiApiException("INVALID", "OpenAi server response failed"),
    Base64ConvertException("INVALID", "Base64 convert failed"),
    VideoUploadException("INVALID", "Video upload failed"),
    FastAiApiException("INVALID", "FastAi server response failed"),
    AnalysisException("INVALID", "FastAi analysis failed"),
    AnalysisJsonException("INVALID", "Analysis json convert failed"),

    /* UnAuthorize exception */
    InvalidLoginUserException("UNAUTHORIZED", "Invalid email or password"),
    DisabledUserException("UNAUTHORIZED", "Disabled user"),
    UnAuthorizedTokenException("UNAUTHORIZED", "UnAuthorized Token"),
    InvalidCurrentPasswordException("UNAUTHORIZED", "Invalid current password"),
    WrongChangedPasswordException("UNAUTHORIZED", "Wrong changedPassword and checkChangePassword"),
    NotVerifyUserException("UNAUTHORIZED", "Not verify user"),

    /* Forbidden exception */
    InaccessibleException("FORBIDDEN", "Inaccessible"),

    /* Not found exception */
    EmailHashNotFoundException("NOT FOUND", "Invalid email"),
    LoginUserNotFoundException("NOT FOUND", "Invalid email or password"),
    UserNotFoundException("NOT FOUND", "Invalid user"),
    CommonQuestionNotFoundException("NOT FOUND", "Invalid common question"),
    CommonKeywordNotFoundException("NOT FOUND", "Invalid common keyword"),
    ProfileDownloadException("NOT FOUND", "Profile download failed"),
    ResumeDownloadException("NOT FOUND", "Resume download failed"),
    ResumeNotFoundException("NOT FOUND", "Resume not found"),
    ResumeDeleteException("NOT FOUND", "Resume delete failed"),
    ResumeQuestionNotFoundException("NOT FOUND", "Resume question not found"),
    ResumeKeywordNotFoundException("NOT FOUND", "Invalid resume keyword"),
    InterviewNotFoundException("NOT FOUND", "Invalid interview"),
    AnalysisNotFoundException("NOT FOUND", "Invalid analysis"),

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
