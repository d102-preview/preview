package com.d102.api.dto.request;

import com.d102.common.utils.RegExpressions;
import jakarta.validation.constraints.*;
import lombok.Getter;

@Getter
public class JoinRequest {

    @NotNull
    @Size(max = 64)
    @Email
    private String email;

    @NotNull
    @Size(min = 8, max = 20)
    @Pattern(regexp = RegExpressions.strongPassword)
    private String password;

    @NotBlank
    @Size(max = 8)
    private String name;

}
