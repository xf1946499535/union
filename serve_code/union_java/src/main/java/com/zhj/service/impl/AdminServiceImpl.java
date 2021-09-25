package com.zhj.service.impl;

import com.zhj.Exception.TransactionException;
import com.zhj.entity.Admin;
import com.zhj.dao.AdminDao;
import com.zhj.entity.Result;
import com.zhj.service.AdminService;
import com.zhj.utity.Token;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import redis.clients.jedis.Jedis;

import javax.annotation.Resource;
import java.util.List;

/**
 * (Admin)表服务实现类
 *
 * @author makejava
 * @since 2021-09-19 13:20:40
 */
@Service
public class AdminServiceImpl implements AdminService {
    @Resource
    private AdminDao adminDao;

    @Override
    public boolean deleteById(Integer id) {
        return this.adminDao.deleteById(id) > 0;
    }

    @Override
    public Result login(Admin admin) throws NullPointerException{
        Admin resultAdmin = adminDao.login(admin);
        if (StringUtils.isEmpty(resultAdmin)){
            if (resultAdmin.getAdmin_name().equals(admin.getAdmin_name())){}
            return new Result().erro(0,"用户不存在");
        }else {
            String token = Token.getTokenByRandom();
            Jedis jedis = new Jedis("127.0.0.1",6379);
            jedis.set(token,resultAdmin.getId().toString());
            jedis.expire(token,300);
            return new Result().success(1,"登陆成功",token,resultAdmin);
        }
    }

    @Override
    public Admin getInfoById(String token) {
        Jedis jedis = new Jedis("127.0.0.1",6379);
        int id = Integer.valueOf(jedis.get(token));
        return adminDao.getInfoById(id);
    }

    @Override
    public List<Admin> getAllInfoOfAdmin() {
        return adminDao.getAllInfoOfAdmin();
    }
}
