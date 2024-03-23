package com.d102.file.mapper;

import com.d102.file.dto.UploadDto;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface UploadMapper {

    UploadDto.profileImageResponse toProfileImageResponse(String profileImageUrl);

}
