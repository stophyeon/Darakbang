package com.example.Purchase.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ValidationRequest {

    String payment_id;
    int total_amount; //결제금액
    String point_name;


}
