package com.zhj.controller;

import com.zhj.dao.WoDao;
import com.zhj.entity.Result;
import com.zhj.entity.Wo;
import com.zhj.service.WoService;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.util.List;

/**
 * (Wo)表控制层
 *
 * @author makejava
 * @since 2021-09-19 18:49:07
 */
@RestController
@CrossOrigin(origins = "*", maxAge = 3600)
@RequestMapping("wo")
public class WoController {
    /**
     * 服务对象
     */
    @Resource
    private WoService woService;


    @PostMapping("addNewWO")
    public Result addNewWO(@RequestBody Wo wo){
        woService.insert(wo);
      return new Result().success();
    }

    @PostMapping("quaryByInfo")
    public List<Wo> quaryByInfo(@RequestBody Wo wo){
        System.out.println(wo.toString());
        return woService.queryAll(wo);
    }


}
