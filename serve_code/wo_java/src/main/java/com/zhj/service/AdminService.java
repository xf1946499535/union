package com.zhj.service;


import com.zhj.entity.Admin;
import com.zhj.entity.Result;

import java.util.List;

/**
 * (Admin)表服务接口
 *
 * @author makejava
 * @since 2021-09-19 13:20:39
 */
public interface AdminService {


    boolean deleteById(Integer id);

    Result login(Admin admin);

    Admin getInfoById(String token);

    List<Admin> getAllInfoOfAdmin();
}
