package com.zhj.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.zhj.entity.Admin;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface UnionMapper extends BaseMapper<Admin> {
}
