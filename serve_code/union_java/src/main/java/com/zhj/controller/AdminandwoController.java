package com.zhj.controller;

import com.zhj.entity.Adminandwo;
import com.zhj.service.AdminandwoService;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;

/**
 * (Adminandwo)表控制层
 *
 * @author makejava
 * @since 2021-09-20 17:33:25
 */
@RestController
@RequestMapping("adminandwo")
public class AdminandwoController {
    /**
     * 服务对象
     */
    @Resource
    private AdminandwoService adminandwoService;



}
