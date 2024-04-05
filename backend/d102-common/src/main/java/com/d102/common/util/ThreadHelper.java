package com.d102.common.util;

import com.d102.common.exception.ExceptionType;
import com.d102.common.exception.custom.InvalidException;

public class ThreadHelper {

    public static void sleep(int millis) {
        try {
            Thread.sleep(millis);
        } catch (InterruptedException e) {
            throw new InvalidException(ExceptionType.ThreadSleepException);
        }
    }

}
