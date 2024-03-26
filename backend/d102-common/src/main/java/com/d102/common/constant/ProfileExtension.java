package com.d102.common.constant;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum ProfileExtension {

    JPG("jpg", new String[] {"image/jpg", "image/jpeg"}),
    PNG("png", new String[] {"image/png"}),
    GIF("gif", new String[] {"image/gif"}),
    BMP("bmp", new String[] {"image/bmp"}),
    ;

    private String profileExtensionLowerCase;
    private String[] profileMimeTypes;

}
