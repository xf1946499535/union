package com.zhj.dao;

import com.zhj.entity.Adminandwo;
import com.zhj.entity.Handler;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * (Adminandwo)表数据库访问层
 *
 * @author makejava
 * @since 2021-09-20 17:33:24
 */
public interface AdminandwoDao {

    void insert(List<Adminandwo> adminandwo);

    List<Adminandwo> selectAdminAndWo(int id);

    Adminandwo getAdminIdAndNameByWoOne_id(int id);

     int  delete(List<Integer> id);

     Adminandwo getAdminIdAndNameByAll(int wo_id,int admin_id);
}

