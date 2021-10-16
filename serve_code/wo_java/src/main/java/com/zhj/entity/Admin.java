package com.zhj.entity;

import lombok.*;

import java.io.Serializable;

/**
 * (Admin)实体类
 *
 * @author makejava
 * @since 2021-09-19 13:20:38
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class Admin implements Serializable {
    private static final long serialVersionUID = -10102096034871861L;

    private Integer id;

    private String admin_name;

    private String admin_password;

    private Integer admin_level;

    private String current_mac;
    /**
     * 安全验证问题
     */
    private String lsa;

    private Result result;


}
