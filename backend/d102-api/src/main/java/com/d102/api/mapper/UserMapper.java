package com.d102.api.mapper;

import com.d102.api.dto.UserDto;
import com.d102.common.domain.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface UserMapper {

    UserDto.Response toUserResponseDto(User user);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "role", ignore = true)
    @Mapping(target = "profileImageName", ignore = true)
    @Mapping(target = "profileImageUrl", ignore = true)
    @Mapping(target = "deletedTime", ignore = true)
    User toUser(UserDto.JoinRequest joinRequestDto);

}

