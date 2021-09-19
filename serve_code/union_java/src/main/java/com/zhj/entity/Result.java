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
    public Result(int code, String msg){
        this.code=code;
        this.msg=msg;
    }

    public Result success(int code, String msg, String token,E data) {
        return(new Result<E>(code,msg,token,data));
    }

    public  Result success() {
        return(new Result<E>(1,"成功"));
    }

    public Result erro() {
        return (new Result<E>(0,"失败"));
    }

    public Result erro(String msg) {
        return (new Result<E>(0,msg));
    }
    public Result erro(int code, String msg) {
        return (new Result<E>(code,msg));
    }

}
