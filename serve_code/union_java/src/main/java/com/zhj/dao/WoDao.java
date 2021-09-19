package com.zhj.dao;

import com.zhj.entity.Wo;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * (Wo)表数据库访问层
 *
 * @author makejava
 * @since 2021-09-19 18:49:06
 */
public interface WoDao {

    /**
     * 通过ID查询单条数据
     *
     * @param id 主键
     * @return 实例对象
     */
    Wo queryById(Integer id);

    /**
     * 查询指定行数据
     *
     * @param offset 查询起始位置
     * @param limit  查询条数
     * @return 对象列表
     */
    List<Wo> queryAllByLimit(@Param("offset") int offset, @Param("limit") int limit);


    /**
     * 通过实体作为筛选条件查询
     *
     * @param wo 实例对象
     * @return 对象列表
     */
    List<Wo> queryAll(Wo wo);

    /**
     * 新增数据
     *
     * @param wo 实例对象
     * @return 影响行数
     */
    int insert(Wo wo);

    /**
     * 批量新增数据（MyBatis原生foreach方法）
     *
     * @param entities List<Wo> 实例对象列表
     * @return 影响行数
     */
    int insertBatch(@Param("entities") List<Wo> entities);

    /**
     * 批量新增或按主键更新数据（MyBatis原生foreach方法）
     *
     * @param entities List<Wo> 实例对象列表
     * @return 影响行数
     */
    int insertOrUpdateBatch(@Param("entities") List<Wo> entities);

    /**
     * 修改数据
     *
     * @param wo 实例对象
     * @return 影响行数
     */
    int update(Wo wo);

    /**
     * 通过主键删除数据
     *
     * @param id 主键
     * @return 影响行数
     */
    int deleteById(Integer id);

}

