package com.d102.common.exception;

import com.d102.common.exception.custom.ConflictException;
import com.d102.common.exception.custom.NotFoundException;
import com.d102.common.exception.custom.TooManyException;
import com.d102.common.exception.custom.*;
import com.d102.common.response.Response;
import com.d102.common.response.ResponseFail;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import jakarta.validation.ConstraintViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import static com.d102.common.exception.ExceptionType.InvalidParamException;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ResponseStatus(value = HttpStatus.BAD_REQUEST)
    @ExceptionHandler(value = {MethodArgumentNotValidException.class, ConstraintViolationException.class})
    public Response handleParamsException(Exception e) {
        return new ResponseFail(InvalidParamException.getCode(), e.getMessage());
    }

    @ResponseStatus(value = HttpStatus.BAD_REQUEST)
    @ExceptionHandler(value = {JsonProcessingException.class, JsonMappingException.class})
    public Response handleJsonException(Exception e) {
        return new ResponseFail(InvalidParamException.getCode(), e.getMessage());
    }

    @ResponseStatus(value = HttpStatus.BAD_REQUEST)
    @ExceptionHandler(value = InvalidException.class)
    public Response handleUploadException(InvalidException e) {
        return new ResponseFail(e.getExceptionType().getCode(), e.getMessage());
    }

    @ResponseStatus(value = HttpStatus.UNAUTHORIZED)
    @ExceptionHandler(value = UnAuthorizeException.class)
    public Response handleUnAuthorizeException(UnAuthorizeException e) {
        return new ResponseFail(e.getExceptionType().getCode(), e.getMessage());
    }

    @ResponseStatus(value = HttpStatus.FORBIDDEN)
    @ExceptionHandler(value = ForbiddenException.class)
    public Response handleForbiddenException(ForbiddenException e) {
        return new ResponseFail(e.getExceptionType().getCode(), e.getMessage());
    }

    @ResponseStatus(value = HttpStatus.NOT_FOUND)
    @ExceptionHandler(value = NotFoundException.class)
    public Response handleNotFoundException(NotFoundException e) {
        return new ResponseFail(e.getExceptionType().getCode(), e.getMessage());
    }

    @ResponseStatus(value = HttpStatus.CONFLICT)
    @ExceptionHandler(value = ConflictException.class)
    public Response handleConflictException(ConflictException e) {
        return new ResponseFail(e.getExceptionType().getCode(), e.getMessage());
    }

    @ResponseStatus(value = HttpStatus.TOO_MANY_REQUESTS)
    @ExceptionHandler(value = TooManyException.class)
    public Response handleTooManyException(TooManyException e) {
        return new ResponseFail(e.getExceptionType().getCode(), e.getMessage());
    }

}