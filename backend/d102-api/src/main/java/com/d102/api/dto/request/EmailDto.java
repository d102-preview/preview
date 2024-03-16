package com.d102.api.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Getter;

@Getter
public class EmailDto {

    @NotNull(message = "필수 정보")
    @Size(max = 50, message = "최대 길이 : 64")
    @Email
    private String email;
}
