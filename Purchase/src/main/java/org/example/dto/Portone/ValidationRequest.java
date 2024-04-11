package org.example.dto.Portone;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class
ValidationRequest {

    String payment_id;
    int difference_amount; //차이 금액
    LocalDate created_at;

    List<ProductInfo> productInfoList;


}
