package org.example.dto;

import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@AllArgsConstructor
@Builder
public class ProductResponse {

    private Long product_id ;

    private String product_name;

    private int price ;

//    @Column(name = "image1")
//    private String image1;
//
//    @Column(name = "image2")
//    private String image2;
//    @Column(name = "image3")
//    private String image3;
//    @Column(name = "image4")
//    private String image4;
//    @Column(name = "image5")
//    private String image5;

    private String product_detail;

    private Date create_at;

    private int category_id;

    private boolean sold_out;

    private String user_email;
}
