package com.example.Purchase.domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Table(name = "point")
@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Point {

    @Id
    @Column(name = "point_id")
    private int pointId;

    @Column(name = "point_name")
    private String pointName;

    @Column(name = "spoint_price")
    private int pointPrice;

    @Column(name = "point_amount")
    private int pointAmount;

}
