package com.d102.common.security;

import com.d102.common.domain.User;
import com.d102.common.exception.ExceptionType;
import com.d102.common.exception.custom.NotFoundException;
import com.d102.common.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collections;
import java.util.List;

@Slf4j
@RequiredArgsConstructor
@Component("userDetailsService")
public class CustomUserDetailsServiceImpl implements UserDetailsService {
	
	private final UserRepository userRepository;

	@Override
	@Transactional
	public UserDetails loadUserByUsername(final String username) {
		return userRepository.findByEmail(username)
				.map(this::createUser)
				.orElseThrow(() -> new NotFoundException(ExceptionType.UserNotFoundException));
	}

	private UserDetails createUser(User user) {
		List<GrantedAuthority> grantedAuthorities = Collections.singletonList(
				new SimpleGrantedAuthority(user.getRole().toString()));

		return new CustomUser(user.getEmail(),
				user.getPassword(),
				user.getName(),
				user.getProfileImageName(),
				user.getProfileImageUrl(),
				grantedAuthorities);
	}
	
}
