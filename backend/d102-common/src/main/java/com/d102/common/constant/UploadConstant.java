package com.d102.common.constant;

import java.io.File;
import java.nio.file.Path;
import java.nio.file.Paths;

public class UploadConstant {

    public static final String PROFILE = "profile";
    public static final Path PROFILE_DIR = Paths.get(System.getProperty("user.dir"), "app", "files", "profile").toAbsolutePath().normalize();

}
