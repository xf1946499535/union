package com.zhj.entity;

import java.io.Serializable;

/**
 * (Project)实体类
 *
 * @author makejava
 * @since 2021-09-25 20:15:43
 */
public class Project implements Serializable {
    private static final long serialVersionUID = -94861471551267861L;

    private Integer id;

    private String title;


    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

}
