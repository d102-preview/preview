package com.d102.api.mapper;

import com.d102.api.dto.ResumeDto;
import com.d102.api.dto.UserDto;
import com.d102.common.domain.jpa.Resume;
import com.d102.common.domain.jpa.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface UserMapper {

    UserDto.Response toUserResponseDto(User user);
    UserDto.ResumeResponse toUserResumeResponseDto(User user);

    @Mapping(target = "status", source = "analysisStatus")
    ResumeDto.Response toResumeResponseDto(Resume resume);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "role", ignore = true)
    @Mapping(target = "profileImageName", ignore = true)
    @Mapping(target = "profileImageUrl", ignore = true)
    @Mapping(target = "profileImageSize", ignore = true)
    @Mapping(target = "deletedTime", ignore = true)
    @Mapping(target = "resumeList", ignore = true)
    User toUser(UserDto.JoinRequest joinRequestDto);

}

