package com.zhj.controller;

import com.zhj.entity.Project;
import com.zhj.service.ProjectService;
import com.zhj.utity.Token;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.util.List;

/**
 * (Project)表控制层
 *
 * @author makejava
 * @since 2021-09-25 20:15:43
 */
@RestController
@RequestMapping("project")
public class ProjectController {
    /**
     * 服务对象
     */
    @Resource
    private ProjectService projectService;

    /**
     * 通过主键查询单条数据
     *
     * @param id 主键
     * @return 单条数据
     */
    @PostMapping ("selectOne")
    public Project selectOne( int id) {
        Token.tokenIsValid();
        return this.projectService.queryById(id);
    }

    @PostMapping ("selectAll")
    public List<Project> selectOne(@RequestBody Project project) {
        Token.tokenIsValid();
        return this.projectService.queryAll(project);
    }


}
