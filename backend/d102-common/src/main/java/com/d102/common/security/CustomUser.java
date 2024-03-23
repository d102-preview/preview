package com.d102.common.security;

import lombok.Getter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;

import java.util.Collection;

@Getter
public class CustomUser extends User {

    private final String name;
    private final String profileImage;

    public CustomUser(String email, String password, String name, String profileImage,  Collection<? extends GrantedAuthority> authorities) {
        super(email, password, authorities);

        this.name = name;
        this.profileImage = profileImage;
    }

}
