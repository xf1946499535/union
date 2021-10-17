package com.zhj.filter;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.filter.OncePerRequestFilter;
import org.springframework.util.AntPathMatcher;

import org.springframework.util.PathMatcher;


import javax.servlet.FilterChain;

import javax.servlet.ServletException;

import javax.servlet.http.HttpServletRequest;

import javax.servlet.http.HttpServletResponse;

import java.io.IOException;

public class JwtAuthenticationFilter extends OncePerRequestFilter {
    private static final Logger log = LoggerFactory.getLogger(JwtAuthenticationFilter.class);

    private static final PathMatcher pathMatcher = new AntPathMatcher();

    @Override

    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        log.info("JWT权限过滤器 JwtAuthenticationFilter开始...");
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE");
        response.setHeader("Access-Control-Max-Age", "3600");
        response.setHeader("Access-Control-Allow-Headers"," Origin, X-Requested-With, Content-Type, Accept");


        try {
            String servletPath = request.getServletPath();

            if (isProtectedUrl(request)) {
                log.info("私密API请求：" + servletPath);

                request = JwtUtil.validateTokenAndAddUserIdToHeader(request);

            } else {
                log.info("开放API请求：" + servletPath);

            }

        } catch (Exception e) {
            log.info("JWT权限过滤器异常：" + e);

            response.sendError(HttpServletResponse.SC_UNAUTHORIZED, e.getMessage());

            return;

        }

        filterChain.doFilter(request, response);

    }

    /**
     * @Author: wRitchie
     * @Description: 是否需要token验证 路径中url含api，则返回true，不含则返回false
     * @Param: [request]
     * @return: boolean
     * @Date: 2019/1/14 14:34
     */

    private boolean isProtectedUrl(HttpServletRequest request) {
/** 对路径中url含有api的请求的返回true */
        if (pathMatcher.match("/*/login", request.getServletPath())){
            return false;
        }
        boolean matchFlag = pathMatcher.match("/*/*", request.getServletPath());

        return matchFlag;

    }

}
