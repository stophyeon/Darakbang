package org.example.dtoforportone;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ValidationRequest {

    String payment_id;
    int difference_amount; //차이 금액
    Long product_id;
    int original_amount ; //상품 원본 금액
    String seller_email;
    LocalDate created_at;

}
