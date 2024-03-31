package com.d102.common.util;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public class TimeConverter {

    public static String convertToFormattedTime(LocalDateTime time) {
        return time.format(DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH-mm-ss"));
    }

}
