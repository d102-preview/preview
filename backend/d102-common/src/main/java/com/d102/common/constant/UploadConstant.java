package com.d102.common.constant;

import java.io.File;
import java.nio.file.Path;
import java.nio.file.Paths;

public class UploadConstant {

    public static final String PROFILE = "profile";
    public static final Path PROFILE_DIR = Paths.get(System.getProperty("user.dir"), "app", "files", "profile").toAbsolutePath().normalize();
    public static final String RESUME = "resume";
    public static final Path RESUME_DIR = Paths.get(System.getProperty("user.dir"), "app", "files", "resume").toAbsolutePath().normalize();
    public static final int RESUME_LIMIT = 3;

}
