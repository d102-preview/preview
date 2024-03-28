package com.d102.common.constant;

import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

public class FileConstant {

    /* Profile */
    public static final String PROFILE = "profile";
    public static final Path PROFILE_SAVE_DIR = Paths.get(System.getProperty("user.dir"), "app", "files", "profile").toAbsolutePath().normalize();
    /* 10MB */
    public static final int PROFILE_SIZE_LIMIT = 10485760;

    /* Resume */
    public static final String RESUME = "resume";
    public static final Path RESUME_SAVE_DIR = Paths.get(System.getProperty("user.dir"), "app", "files", "resume").toAbsolutePath().normalize();
    public static final int RESUME_UPLOAD_LIMIT = 3;
    /* 30MB */
    public static final int RESUME_SIZE_LIMIT = 31457280;

    /* Video */
    public static final String VIDEO = "video";
    public static final Path VIDEO_SAVE_DIR = Paths.get(System.getProperty("user.dir"), "app", "files", "video").toAbsolutePath().normalize();

}
