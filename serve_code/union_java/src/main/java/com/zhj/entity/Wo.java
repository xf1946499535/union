package com.zhj.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.util.Date;
import java.io.Serializable;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class Wo implements Serializable {

    private Integer id;

    private String title;

    private Integer creator_id;

    private String status;

    private String detail;

    private Date create_time;

    private Date over_time;

    private Integer project_id;

    private Date estimate_time;

    private int[] distributPeople;

    private String distributPeoplee;


}
