package org.example.entity;

import org.example.dto.ProductResponse;
import jakarta.persistence.*;
import lombok.*;

import java.util.Date;

@Table(name = "product")
@Entity
@Data
@RequiredArgsConstructor
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "product_id")
    private Long productId ;

    @Column(name = "product_name")
    private String productname;

    @Column(name = "price")
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

    @Column(name = "Pmessage")
    private String pmessage;

    @Column(name = "create_at")
    private Date createat;

    @Column(name = "category_id")
    private int categoryid;

    @Column(name = "sold_out")
    private boolean soldout;

    @Column(name = "user_email")
    private String useremail;


    public Product(String product_name, int price, String pmessage, Date create_at, int category_id, boolean sold_out, String user_email) {
        this.productname = product_name;
        this.price = price;
        this.pmessage = pmessage;
        this.createat = create_at;
        this.categoryid = category_id;
        this.soldout = sold_out;
        this.useremail = user_email;
    }

    public ProductResponse toProductResponseDto()
    {
        return ProductResponse.builder()
                .product_id(productId)
                .product_name(productname)
                .price(price)
                .product_detail(pmessage)
                .create_at(createat)
                .category_id(categoryid)
                .sold_out(soldout)
                .user_email(useremail).build();
    }



}
