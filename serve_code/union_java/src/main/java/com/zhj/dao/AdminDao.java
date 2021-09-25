package com.zhj.dao;

import com.zhj.entity.Admin;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * (Admin)表数据库访问层
 *
 * @author makejava
 * @since 2021-09-19 13:20:38
 */
@Mapper
public interface AdminDao {


    int deleteById(Integer id);

    Admin login(Admin admin);

    Admin getInfoById(int id);

    List<Admin> getAllInfoOfAdmin();


}

