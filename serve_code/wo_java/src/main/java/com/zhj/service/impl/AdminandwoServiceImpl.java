package com.zhj.service.impl;

import com.zhj.entity.Adminandwo;
import com.zhj.dao.AdminandwoDao;
import com.zhj.service.AdminandwoService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

/**
 * (Adminandwo)表服务实现类
 *
 * @author makejava
 * @since 2021-09-20 17:33:24
 */
@Service("adminandwoService")
public class AdminandwoServiceImpl implements AdminandwoService {
    @Resource
    private AdminandwoDao adminandwoDao;


//    @Override
//    public int insert(Adminandwo adminandwo) {
//
//    }
}
