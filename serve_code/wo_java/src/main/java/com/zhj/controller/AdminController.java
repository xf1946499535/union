package com.zhj.controller;

import com.zhj.entity.Admin;
import com.zhj.entity.Result;
import com.zhj.service.AdminService;
import com.zhj.utity.Token;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import redis.clients.jedis.Jedis;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.List;

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

    @Autowired
    private HttpServletRequest request;

    @PostMapping("login")
    public Result login(@RequestBody Admin admin) throws NullPointerException{
        return adminService.login(admin);
    }

//    @PostMapping("getinfoByToken")
//    public Admin getinfoByToken(String token){
//        System.out.println(token);
//        return adminService.getInfoById(token);
//    }

    @PostMapping("getinfoByToken")
    public Admin getinfoByToken(){
//        HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest();
//        String token = request.getHeader("token");
        String token = Token.getTokenInfo();
        return adminService.getInfoById(token);
    }
    @PostMapping("/getAllInfoOfAdmin")
    public List<Admin> getAllInfoOfAdmin(){
           Token.tokenIsValid();
           return adminService.getAllInfoOfAdmin();

    }
    @PostMapping("removeToken")
    public Result removeToken(){
        String token = Token.getTokenInfo();
        Jedis jedis = new Jedis("127.0.0.1",6379);
        jedis.del(token);
        return new Result().success();
    }


}
