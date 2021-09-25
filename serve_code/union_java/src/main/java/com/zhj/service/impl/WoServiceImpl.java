package com.zhj.service.impl;

import com.zhj.dao.AdminandwoDao;
import com.zhj.entity.Adminandwo;
import com.zhj.entity.Wo;
import com.zhj.dao.WoDao;
import com.zhj.service.WoService;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.HashMap;
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
    @Resource
    private AdminandwoDao adminandwoDao;
    @Override
    public int insert(Wo wo) {
        String s = "";
        if (wo.getDistributPeople() == null||wo.getDistributPeople().length == 0){
            System.out.println("1");
            this.woDao.insert(wo);
        }else {
            System.out.println("2");
            this.woDao.insertHasAdmin(wo);
            List<Adminandwo> list = new ArrayList<>();
            for (int distributPerson : wo.getDistributPeople()) {
                Adminandwo adminandwo =new Adminandwo() ;
                adminandwo.setWo_id(wo.getId());
                adminandwo.setAdmin_id(distributPerson);
                list.add(adminandwo);
            }
            adminandwoDao.insert(list);
        }



        return 0;
    }

    /**
     * 修改数据
     *
     * @param wo 实例对象
     * @return 实例对象
     */
    @Override
    public Wo updateWoInfoById(Wo wo) {
        List<Adminandwo> list = adminandwoDao.selectAdminAndWo(wo.getId());
        HashMap<Integer,Integer> hashMap = new HashMap<Integer,Integer>();
        HashMap<Integer,Integer> listmap = new HashMap<Integer,Integer>();
        for (Adminandwo adminandwo : list) {
            hashMap.put(adminandwo.getAdmin_id(),adminandwo.getAdmin_id());
        }
        listmap.put(wo.getHandler_id(),wo.getHandler_id());
        for (int distributPerson : wo.getDistributPeople()) {
            listmap.put(distributPerson,distributPerson);
        }
        if (!hashMap.containsKey(wo.getHandler_id())){
            throw new RuntimeException("操作非法,你没有操作权限");
        }
        List<Adminandwo> add = new ArrayList<>();
        List<Integer> del = new ArrayList<>();
        for (int distributPerson : wo.getDistributPeople()) {
            if (!hashMap.containsKey(distributPerson)){
                add.add(new Adminandwo(wo.getId(),distributPerson));
            }
        }
       if (!add.isEmpty()) {
           adminandwoDao.insert(add);
       }


//        for (Adminandwo adminandwo : list) {
//            System.out.println(adminandwo.toString());
//        }
        for (Adminandwo adminandwo : list) {
            if (!listmap.containsKey(adminandwo.getAdmin_id())){
                del.add(adminandwo.getId());
            }
        }
        if (!del.isEmpty()) {
            adminandwoDao.delete(del);
        }

//
//        System.out.println("增加");
//        for (Adminandwo adminandwo : add) {
//            System.out.println(adminandwo);
//        }
//
//        System.out.println("删除");
//        for (Integer integer : del) {
//            System.out.println(integer);
//        }


//        this.woDao.updateWoInfoById(wo);
       return null;
    }

    @Override
    public List<Wo> queryAll(Wo wo) {
        List<Wo> result =  woDao.queryAll(wo);
        for (Wo wo1 : result) {
           wo1.setHandlers(woDao.getAdminIdAndNameByWo_id(wo1.getId()));
           wo1.setHandler(woDao.getAdminIdAndNameByWoOne_id(wo.getHandler_id()));
        }

        return  result;
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

    @Override
    public int changeStatus(int id, int newStaus) {
        return woDao.changeStatus(id,newStaus);
    }
}
