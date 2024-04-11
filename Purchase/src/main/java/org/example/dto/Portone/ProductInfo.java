package org.example.dto.Portone;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProductInfo {

    Long product_id;
    int original_amount ; //상품 원본 금액
    String seller_email;

}
