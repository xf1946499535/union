package com.zhj.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.util.Date;
import java.io.Serializable;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class Wo implements Serializable {

    private Integer id;

    private String title;

    private Integer creator_id;

    private int status;

    private String detail;

    private Date create_time;

    private Date over_time;

    private Date estimate_time;

    private int[] distributPeople;

    private Integer project_id;

    private Project project_info;

    private int handler_id;

    private Handler handler;

    private List<Handler> handlers;

    private Result result;


}
