package com.zhj.utity;


import com.zhj.dao.AdminandwoDao;
import com.zhj.entity.Adminandwo;
import org.springframework.util.StringUtils;

import javax.annotation.Resource;
import java.util.List;

public class WoUlity {

    @Resource
    private AdminandwoDao adminandwoDaoo;

    public  Boolean handlerOfAdmin(int wo_id,int admin_id){
        System.out.println(wo_id);
        System.out.println(admin_id);
        List<Adminandwo> list = adminandwoDaoo.selectAdminAndWo(wo_id);
       int flag = 0;
        for (Adminandwo adminandwo : list) {
            if (adminandwo.getAdmin_id() == admin_id){
                flag = 1;
            }
        }

        return  flag==0?false:true;
    }

}
