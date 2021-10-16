package com.zhj.service.impl;


import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.zhj.entity.Admin;
import com.zhj.mapper.UnionMapper;
import com.zhj.service.UnionService;
import org.springframework.stereotype.Service;

@Service
public class UnionServiceImpl extends ServiceImpl<UnionMapper, Admin> implements UnionService {

}
