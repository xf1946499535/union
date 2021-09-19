package com.zhj.controller;

import com.alibaba.fastjson.JSON;
import com.zhj.entity.Admin;
import com.zhj.entity.Result;
import com.zhj.service.AdminService;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;

/**
 * (Admin)表控制层
 *
 * @author makejava
 * @since 2021-09-19 13:20:41
 */
@RestController
@CrossOrigin(origins = "*", maxAge = 3600)
@RequestMapping("admin")
public class AdminController {
    /**
     * 服务对象
     */
    @Resource
    private AdminService adminService;

    @PostMapping("login")
    public Result login(@RequestBody Admin admin) throws NullPointerException{
        return adminService.login(admin);
    }

    @PostMapping("getinfoByToken")
    public Admin getinfoByToken(String token){
        System.out.println(token);
        return adminService.getInfoById(token);
    }


}
