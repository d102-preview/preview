package com.d102.common.util;

import com.d102.common.exception.ExceptionType;
import com.d102.common.exception.custom.NotFoundException;
import org.apache.commons.lang3.StringUtils;

public class UserVerifier {

    public static void checkLoginUserAndResourceUser(String loginEmail, String resourceEmail) {
        if (!StringUtils.equals(loginEmail, resourceEmail)) {
            throw new NotFoundException(ExceptionType.NotVerifyUserException);
        }
    }

}
