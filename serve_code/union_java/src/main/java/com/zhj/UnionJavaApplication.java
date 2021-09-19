package com.zhj;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.CrossOrigin;

@SpringBootApplication
@MapperScan("com.zhj.dao")
@CrossOrigin
public class UnionJavaApplication {

    public static void main(String[] args) {
        SpringApplication.run(UnionJavaApplication.class, args);
    }

}
