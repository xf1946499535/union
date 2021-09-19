package com.zhj.Exception;

public interface CommonError {
	public int getErrorCode();

	public String getErrorMsg();

	public CommonError setErrorMsg(String ErrorMsg);
}
