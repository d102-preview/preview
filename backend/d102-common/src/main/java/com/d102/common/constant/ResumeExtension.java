package com.d102.common.constant;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum ResumeExtension {

    PDF("pdf", new String[] {"application/pdf"}),
    ;

    private String resumeExtensionLowerCase;
    private String[] resumeMimeTypes;

}
