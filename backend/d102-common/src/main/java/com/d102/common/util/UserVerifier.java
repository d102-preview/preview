package com.d102.common.util;

import com.d102.common.exception.ExceptionType;
import com.d102.common.exception.custom.NotFoundException;
import org.apache.commons.lang3.StringUtils;

public class UserVerifier {

    public static void checkLoginUserAndResumeUser(String loginEmail, String resumeEmail) {
        if (!StringUtils.equals(loginEmail, resumeEmail)) {
            throw new NotFoundException(ExceptionType.NotVerifyUserException);
        }
    }

}
