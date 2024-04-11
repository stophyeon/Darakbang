package org.example.dtoforportone;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class ValidationBucketRequest {

    String payment_id;
    int total_amount; //결제금액
    List<Long> product_id_list ;
}
