package com.zhj.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.io.Serializable;

/**
 * (Adminandwo)实体类
 *
 * @author makejava
 * @since 2021-09-20 17:33:23
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class Adminandwo implements Serializable {
    private static final long serialVersionUID = -60251835521005816L;

    private Integer id;

    private Integer admin_id;

    private Integer wo_id;

    private Result result;

    public  Adminandwo(int wo_id,int admin_id){
        this.admin_id = admin_id;
        this.wo_id = wo_id;
    }




}
