package com.zhj.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class Result<E> {
    private int code;
    private String msg;
    private String token;
    private E data;

    public Result(int code, String msg) {
        this.code = code;
        this.msg = msg;
    }


    public Result(int code, String msg,String token) {
        this.code = code;
        this.msg = msg;
        this.token = token;
    }

    public Result(int code, String msg,E data) {
        this.code = code;
        this.msg = msg;
        this.data = data;
    }

    public Result success(int code, String msg, String token, E data) {
        return (new Result<E>(code, msg, token, data));
    }

    public static Result success(int code, String msg, String token) {
        return (new Result(code, msg, token));
    }

    public Result successOfData(int code, String msg, E data) {
        return (new Result(code, msg, data));
    }

    public Result success() {
        return (new Result<E>(1, "成功"));
    }

    public Result success(int code, String msg) {
        return (new Result<E>(code, msg));
    }

    public Result erro() {
        return (new Result<E>(0, "失败"));
    }

    public Result erro(String msg) {
        return (new Result<E>(0, msg));
    }

    public Result erro(int code, String msg) {
        return (new Result<E>(code, msg));
    }

}
