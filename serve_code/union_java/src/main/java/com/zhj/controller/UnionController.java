package com.zhj.controller;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.zhj.entity.Admin;
import com.zhj.service.UnionService;
import com.zhj.utils.Token;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;

@RestController
@RequestMapping("/union")
public class UnionController {

    @Resource
    UnionService unionService;
    @RequestMapping("/helloWorld")
    public String helloWorld() {
        return "helloWorld";
    }

    @RequestMapping("/test")
    public Admin test() {
        Token.addBody();
        return unionService.getOne(new QueryWrapper<Admin>().eq("admin_name","xiangfeng"),true);
    }



}
