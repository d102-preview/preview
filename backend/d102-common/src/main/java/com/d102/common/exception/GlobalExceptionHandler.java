package com.d102.common.exception;

import com.d102.common.exception.custom.ConflictException;
import com.d102.common.response.Response;
import com.d102.common.response.ResponseFail;
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

    @ResponseStatus(value = HttpStatus.CONFLICT)
    @ExceptionHandler(value = ConflictException.class)
    public Response handleConflictException(ConflictException e) {
        return new ResponseFail(e.getExceptionType().getCode(), e.getMessage());
    }

}