package com.zhj.entity;

import com.baomidou.mybatisplus.annotation.TableField;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.mockito.internal.matchers.Null;

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
    @TableField("id")
    private Integer id;
    @TableField("admin_name")
    private String adminName;
    @TableField("admin_password")
    private String adminPassword;
    @TableField("admin_level")
    private Integer adminLevel;
    @TableField("current_mac")
    private String currentMac;
    /**
     * 安全验证问题
     */
    @TableField("lsa")
    private String lsa;

    @TableField(exist = false)
    private Result result;


}
