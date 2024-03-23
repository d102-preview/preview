package com.d102.common.security;

import com.d102.common.response.ResponseFail;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.io.PrintWriter;
import java.nio.charset.StandardCharsets;

import static com.d102.common.exception.ExceptionType.*;

@Component
public class JwtAuthenticationEntryPoint implements AuthenticationEntryPoint {
	
	@Override
	public void commence(HttpServletRequest request,
						 HttpServletResponse response,
						 AuthenticationException exception) throws IOException {
		// BadCredentialsException : invalid password when login.
		// DisabledException : disabled user when login.

		ResponseFail responseFail;
		if (exception instanceof BadCredentialsException) {
			responseFail = new ResponseFail(InvalidLoginUserException.getCode(), InaccessibleException.getMessage());
		} else if (exception instanceof DisabledException) {
			responseFail = new ResponseFail(DisabledUserException.getCode(), DisabledUserException.getMessage());
		} else {
			responseFail = new ResponseFail(UnAuthorizedTokenException.getCode(), UnAuthorizedTokenException.getMessage());
		}

		response.setStatus(HttpStatus.UNAUTHORIZED.value());
		response.setContentType(MediaType.APPLICATION_JSON_VALUE);
		response.setCharacterEncoding(StandardCharsets.UTF_8.name());

		PrintWriter out = response.getWriter();
		out.print(responseFail);
		out.flush();
		out.close();
   }
   
}
