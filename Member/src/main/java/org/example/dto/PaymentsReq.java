package org.example.dto;

import lombok.Data;
import lombok.RequiredArgsConstructor;


import java.time.LocalDate;


@Data
@RequiredArgsConstructor
public class PaymentsReq {
    private String seller;
    private int total_point;
    private Long product_id;

    private LocalDate purchase_at;

}
