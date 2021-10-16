package com.zhj.controller;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.zhj.entity.Admin;
import com.zhj.entity.Result;
import com.zhj.filter.JwtUtil;
import com.zhj.service.UnionService;
import com.zhj.service.impl.UnionServiceImpl;
import com.zhj.utils.Token;
import io.jsonwebtoken.Jwts;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.apiguardian.api.API;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.HttpStatus;

import org.springframework.http.ResponseEntity;

import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;
import redis.clients.jedis.Jedis;

import javax.servlet.http.HttpServletRequest;
import java.awt.*;
import java.util.HashMap;

import java.util.List;

import java.util.Map;
import java.util.Objects;

/**
 * @Title: LoginController.java
 * @Description: 登录控制类
 * @author: wRitchie
 * @date: 2018/12/28 15:39
 * @version: V1.0
 * @Copyright (c): 2018 http://bj9420.com All rights reserved.
 */

@RestController

@RequestMapping("union")

@Api(value = "登录控制类", tags = "登录控制类")
public class LoginController  {
    private static final Logger logger = LoggerFactory.getLogger(LoginController.class);

    @Autowired
    private UnionService userService;

    @Autowired

    private UnionServiceImpl menuService;

    @PostMapping("login")

    @ApiOperation(value = "登录测试", notes = "无权限验证的登录测试")

    public Result login(@RequestBody Admin admin) {
        if (userService.getOne(new QueryWrapper<Admin>().eq("admin_name",admin.getAdminName()).eq("admin_password",admin.getAdminPassword()))!=null){
            String token = Token.saveToken(admin.getAdminName());
            return  Result.success(1,"成功",token);
        }else {
            return new Result().erro();
        }
    }

    @PostMapping("getTokenInfo")
    public Result getTokenInfo() {
         HttpServletRequest request = ((ServletRequestAttributes) Objects.requireNonNull(RequestContextHolder.getRequestAttributes())).getRequest();
        String token = request.getHeader("token");
        String username = Token.getInfoByToken(token);
        return new Result().successOfData(1,"success",userService.getOne(new QueryWrapper<Admin>().eq("admin_name",username)));
    }

    @GetMapping("signl")

    @ApiOperation(value = "登录测试", notes = "无权限验证的登录测试")

    public Admin signl(String loginName) {
        logger.info("#######LoginController#######");
        System.out.println(loginName);
        Admin admin = userService.getOne(new QueryWrapper<Admin>().eq("admin_name","xiangfeng"));

        return admin;


    }

}
