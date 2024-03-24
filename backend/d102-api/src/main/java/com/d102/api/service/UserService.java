package com.d102.api.service;

import com.d102.api.dto.UserDto;

public interface UserService {

    UserDto.Response get();

    UserDto.Response update(UserDto.UpdateRequest updateRequestDto);

    void changePassword(UserDto.PasswordUpdateRequest passwordUpdateRequestDto);

    void delete();

}
