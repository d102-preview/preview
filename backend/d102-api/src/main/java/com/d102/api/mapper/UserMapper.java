package com.d102.api.mapper;

import com.d102.api.dto.request.JoinDto;
import com.d102.api.dto.response.UserResponseDto;
import com.d102.common.domain.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface UserMapper {

    UserResponseDto toUserResponseDto(User user);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "role", ignore = true)
    @Mapping(target = "profileImage", ignore = true)
    @Mapping(target = "deletedTime", ignore = true)
    User toUser(JoinDto joinDto);

}

