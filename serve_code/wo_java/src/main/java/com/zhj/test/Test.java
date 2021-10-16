package com.zhj.test;

import redis.clients.jedis.Jedis;

public class Test {


    @org.junit.jupiter.api.Test
    public void test(){
        Jedis jedis = new Jedis("127.0.0.1",6379);
        jedis.set("zhj","789");
    }
}
