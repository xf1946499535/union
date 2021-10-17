package com.zhj.filter;

import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;

@Component
public class JwtBean {

    @Bean
    public FilterRegistrationBean jwtFilter() {
        System.out.println("JWT Filter 运行中...");

        final FilterRegistrationBean registrationBean = new FilterRegistrationBean();

        JwtAuthenticationFilter filter = new JwtAuthenticationFilter();

        registrationBean.setFilter(filter);

        return registrationBean;

    }

}
