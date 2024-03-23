package com.d102.common.util;

import java.util.Random;

public class RandomGenerator {

    public static int createAuthorizationCode() {
        return new Random().nextInt(900000) + 100000;
    }

}
