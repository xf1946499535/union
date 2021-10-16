package com.zhj.service;

import com.zhj.entity.Handler;
import com.zhj.entity.Wo;

import java.util.List;

/**
 * (Wo)表服务接口
 *
 * @author makejava
 * @since 2021-09-19 18:49:06
 */
public interface WoService {
    int insert(Wo wo);

    /**
     * 修改数据
     *
     * @param wo 实例对象
     * @return 实例对象
     */
    Wo updateWoInfoById(Wo wo);

    List<Wo> queryAll(Wo wo);

    /**
     * 通过主键删除数据
     *
     * @param id 主键
     * @return 是否成功
     */

    boolean deleteById(Integer id);

    int changeStatus(int id,int newStaus);

    Boolean handlerOfAdmin(int wo_id,int admin_id);

    int deleteFromWoByLogical(int id);

}
