package org.example.dto;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class Payments {
    private int product_point; //이 금액은, 원본 금액입니다.
    private Long product_id ;
    private String seller;

    @Builder
    public Payments(int product_point, Long product_id, String seller)
    {
        this.product_point = product_point ;
        this.product_id = product_id ;
        this.seller = seller;
    }

    public static Payments ToPointChangeProductInfo(ProductInfo productinfo) {
        return Payments.builder()
                .product_point(productinfo.getOriginal_amount())
                .product_id(productinfo.getProduct_id())
                .seller(productinfo.getSeller_email())
                .build();
    }


}
