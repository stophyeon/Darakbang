package org.example.dto;

import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@RequiredArgsConstructor
public class PaymentsReq {
    private String seller;
    private int total_point;
    private Long product_id;
}
