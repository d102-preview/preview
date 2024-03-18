package com.d102.api.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;

@Getter
public class EmailDto {

    @NotNull
    @Size(max = 64)
    @Email
    private String email;

}
