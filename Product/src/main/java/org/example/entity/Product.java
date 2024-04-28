package org.example.entity;

import org.example.dto.product.ProductDto;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;


@Entity
@Getter
@RequiredArgsConstructor
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "product_id")
    private Long productId ;

    @Column(name = "product_name")
    private String productName;

    @Column(name = "price")
    private int price ;

    @Lob
    @Column(name = "image_product")
    private String ImageProduct;

    @Lob
    @Column(name = "image_real")
    private String ImageReal;


    @Column(name = "create_at")
    private LocalDate createAt;

    @Column(name="state")
    private int state=1;

    @Column(name = "category_id")
    private int categoryId;

    @Column(name = "expiration_at")
    private LocalDate expireAt;

    @Column(name = "nickname")
    private String nickName;

    @Column(name = "user_email")
    private String userEmail;

    @Column(name = "user_profile")
    private String userProfile;


    @Builder
    public Product(Long productId,String productName, int price, String imageProduct, String imageReal, LocalDate createAt, int categoryId, LocalDate expireAt, String nickName,String userProfile, String userEmail,int state) {
        this.productId=productId;
        this.productName = productName;
        this.price = price;
        this.ImageProduct = imageProduct;
        this.ImageReal = imageReal;
        this.createAt = createAt;
        this.categoryId = categoryId;
        this.expireAt = expireAt;
        this.nickName = nickName;
        this.userEmail = userEmail;
        this.userProfile=userProfile;
    }



    public static Product ToEntity(ProductDto productDto,String userEmail){
        return Product.builder()
                .categoryId(productDto.getCategory_id())
                .productName(productDto.getProduct_name())
                .createAt(productDto.getCreate_at())
                .expireAt(productDto.getExpire_at())
                .nickName(productDto.getNick_name())
                .userEmail(userEmail)
                .price(productDto.getPrice())
                .imageProduct(productDto.getImage_product())
                .imageReal(productDto.getImage_real())
                .userProfile(productDto.getUserProfile())
                .build();
    }





}
