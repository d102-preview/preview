package com.d102.file.util;

import com.d102.common.constant.ProfileExtension;
import jakarta.validation.Constraint;
import jakarta.validation.Payload;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Target({ElementType.METHOD, ElementType.FIELD, ElementType.ANNOTATION_TYPE, ElementType.CONSTRUCTOR, ElementType.PARAMETER, ElementType.TYPE_USE})
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = ProfileValidator.class)
public @interface ProfileValid {

    String message();

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};

    ProfileExtension[] allowedExtensions();

}
