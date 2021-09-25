package com.zhj.controller;

import com.sun.net.httpserver.Authenticator;
import com.zhj.dao.WoDao;
import com.zhj.entity.Result;
import com.zhj.entity.Status;
import com.zhj.entity.Wo;
import com.zhj.service.WoService;
import com.zhj.utity.Token;
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
        Token.tokenIsValid();
        woService.insert(wo);
      return new Result().success();
    }

    @PostMapping("updateWoInfoById")
    public Result updateWoInfoById(@RequestBody Wo wo){
        Token.tokenIsValid();
        woService.updateWoInfoById(wo);
        return new Result().success();
    }

    @PostMapping("quaryByInfo")
    public List<Wo> quaryByInfo(@RequestBody Wo wo){
        System.out.println(wo.toString());
        Token.tokenIsValid();
        return woService.queryAll(wo);
    }

    @PostMapping("updateWoOfStatus")
    public Result updateWoOfStatus(@RequestBody Status status){
      if (status.getStatus()<0||status.getStatus()>4){
          throw new RuntimeException("数字非法");
      }
        Token.tokenIsValid();
        if (status.isFlag() == false && (status.getStatus() ==3 || status.getStatus() ==4) ){
            status.setStatus(0);
        }
        woService.changeStatus(status.getId(),status.getStatus()+1);
        return new Result().success();
    }


}
