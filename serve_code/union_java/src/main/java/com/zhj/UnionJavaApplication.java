package com.zhj;

import com.zhj.filter.JwtAuthenticationFilter;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class UnionJavaApplication {

    public static void main(String[] args) {
        SpringApplication.run(UnionJavaApplication.class, args);
    }
}



