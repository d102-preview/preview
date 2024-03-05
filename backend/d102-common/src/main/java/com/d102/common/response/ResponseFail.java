package com.d102.common.response;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

public class ResponseFail extends Response {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	public static final String RESULT 	= "result";
	public static final String CODE 	= "code";
	public static final String MESSAGE 	= "message";
	public static final String OK 		= "ok";
	public static final String FAIL 	= "fail";
	
	public ResponseFail(String code, String message) {
		setData(Response.RESULT, Response.FAIL);
		setData(Response.CODE, code);
		setData(Response.MESSAGE, message);
	}

	@Override
	public String toString() {
		ObjectMapper mapper = new ObjectMapper();
		try {
			return mapper.writeValueAsString(this);
		} catch (JsonProcessingException e) {
			return "{}";
		}
	}
}
