package org.example.dto;

import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor

public class ProductSaveRequest {

    public ProductSaveRequest(){
    }

    private String product_name;

    private int price ;

    private List image;
//
//    private String image2;
//
//    private String image3;
//
//    private String image4;
//
//    private String image5;

    private String product_detail;

    private Date create_at;

    private int category_id;

    private boolean sold_out;

    private String jwt;



}
