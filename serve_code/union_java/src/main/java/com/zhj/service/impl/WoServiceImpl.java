package com.zhj.service.impl;

import com.zhj.entity.Wo;
import com.zhj.dao.WoDao;
import com.zhj.service.WoService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

/**
 * (Wo)表服务实现类
 *
 * @author makejava
 * @since 2021-09-19 18:49:07
 */
@Service("woService")
public class WoServiceImpl implements WoService {
    @Resource
    private WoDao woDao;
    @Override
    public Wo insert(Wo wo) {
        String s = "";
        int flag = 0;
        for (int distributPerson : wo.getDistributPeople()) {
            if (flag == 0){
               s += distributPerson;
            }else {
                s = s+"-"+distributPerson;
            }
           flag++;
        }
        wo.setDistributPeoplee(s);
        this.woDao.insert(wo);
        return wo;
    }

    /**
     * 修改数据
     *
     * @param wo 实例对象
     * @return 实例对象
     */
    @Override
    public Wo update(Wo wo) {
        this.woDao.update(wo);
    return null;
    }

    @Override
    public List<Wo> queryAll(Wo wo) {
        return woDao.queryAll(wo);
    }

    /**
     * 通过主键删除数据
     *
     * @param id 主键
     * @return 是否成功
     */
    @Override
    public boolean deleteById(Integer id) {
        return this.woDao.deleteById(id) > 0;
    }
}
