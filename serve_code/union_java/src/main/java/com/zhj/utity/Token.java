package com.zhj.utity;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.StringUtils;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;
import redis.clients.jedis.Jedis;

import javax.servlet.http.HttpServletRequest;
import java.util.Random;

public class Token {
    final static char[] arr = {'0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R'
    ,'S','T','U','V','W','X','Y','Z','a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'};

    @Autowired
    private HttpServletRequest request;
    public static String getTokenByRandom(){
        Random random =new Random();
        String s = "";
        for (int i=0;i<15;i++){
            int k = random.nextInt(62);
            s += Character.toString(arr[k]);
        }
        return s;
    }

    public static String getTokenInfo(){
        HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest();
        String token = request.getHeader("token");
        return token;
    }

    public static boolean tokenIsValid(){
        String token = Token.getTokenInfo();
        Jedis jedis = new Jedis("127.0.0.1",6379);
        if (StringUtils.hasLength(jedis.get(token))){

            jedis.expire(token,1200);
            return true;
        }else {
            throw new RuntimeException("找不到对应的token值");
        }
    }

    @Test
    public void test(){
        String kk = getTokenByRandom();
        System.out.println(kk);
    }

}
