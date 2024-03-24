package com.d102.common.security;

import lombok.Getter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;

import java.util.Collection;

@Getter
public class CustomUser extends User {

    private final String name;
    private final String profileImageName;
    private final String profileImageUrl;

    public CustomUser(String email, String password, String name, String profileImageName, String profileImageUrl, Collection<? extends GrantedAuthority> authorities) {
        super(email, password, authorities);

        this.name = name;
        this.profileImageName = profileImageName;
        this.profileImageUrl = profileImageUrl;
    }

}
