package com.zhj.filter;

import io.jsonwebtoken.Jwts;

import io.jsonwebtoken.SignatureAlgorithm;

import org.slf4j.Logger;

import org.slf4j.LoggerFactory;
import org.springframework.util.StringUtils;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;
import redis.clients.jedis.Jedis;

import javax.servlet.http.HttpServletRequest;

import javax.servlet.http.HttpServletRequestWrapper;

import java.util.*;

/**
 * @Author: wRitchie
 * @Description: JwtUtil工具类
 * @Param:
 * @return:
 * @Date: 2019/1/14 15:14
 */

public class JwtUtil {
    private static final Logger log = LoggerFactory.getLogger(JwtUtil.class);

    /**
     * 失效时间： 1 天 =24*3600*1000 ms
     */

    public static final long EXPIRATION_TIME = 1 * 24 * 3600 * 1000;

    /**
     * 私钥
     */

    public static final String SECRET = "http://www.bj9420.com/jwt";

    /**
     * token 前缀
     */

    public static final String TOKEN_PREFIX = "Bearer ";

    /**
     * Authorization header
     */

    public static final String HEADER_STRING = "Authorization";

    /**
     * 保存的数据字段名称
     */

    public static final String USER_NAME = "userId";

    public static String generateToken(String userId) {
        HashMap<String, Object> map = new HashMap<>();

//可以将自定义相关的数据放入Map中

        map.put(USER_NAME, userId);

        String jwt = Jwts.builder()

                .setClaims(map)

                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))

                .signWith(SignatureAlgorithm.HS512, SECRET)

                .compact();

//jwt前面一般都会加Bearer

        return TOKEN_PREFIX + jwt;

    }

    public static String getTokenInfo() {
        HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest();
        String token = request.getHeader("token");
        return token;
    }

    public static boolean tokenIsValid(String token) {
        Jedis jedis = new Jedis("127.0.0.1", 6379);
        if (StringUtils.hasLength(jedis.get(token))) {
            jedis.expire(token, 1200);
            return true;
        } else {
            return false;
        }
    }

    public static HttpServletRequest validateTokenAndAddUserIdToHeader(HttpServletRequest request) {
        String token = request.getHeader("token");
        log.info("请求token:" + token);

        if (token != null) {
// 解析令牌token.

            try {

//                Map<String, Object> body = Jwts.parser()
//                        .setSigningKey(SECRET)
//                        .parseClaimsJws(token.replace(TOKEN_PREFIX, ""))
//                        .getBody();
                if (tokenIsValid(token)){
                    return new CustomHttpServletRequest(request, new HashMap<>());
                }else {
                    throw new TokenValidationException("The token is invalid!");

                }

            } catch (Exception e) {
                log.info(e.getMessage());

                throw new TokenValidationException(e.getMessage());

            }

        } else {
            throw new TokenValidationException("The token is invalid!");

        }

    }

    public static class CustomHttpServletRequest extends HttpServletRequestWrapper {
        private Map<String, String> claims;

        public CustomHttpServletRequest(HttpServletRequest request, Map<String, ?> claims) {
            super(request);

            this.claims = new HashMap<>();

            claims.forEach((k, v) -> this.claims.put(k, String.valueOf(v)));

        }

        @Override

        public Enumeration<String> getHeaders(String name) {
            if (claims != null && claims.containsKey(name)) {
                return Collections.enumeration(Arrays.asList(claims.get(name)));

            }

            return super.getHeaders(name);

        }

        public Map<String, String> getClaims() {
            return claims;

        }

    }

    static class TokenValidationException extends RuntimeException {
        public TokenValidationException(String msg) {
            super(msg);

        }

    }

}
