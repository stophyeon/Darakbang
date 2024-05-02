package org.example.dto.forbackend;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrderSaveRequest {
    private String seller ;
    private String consumer ;
    private Long product_id ;
    private int product_point;
    private LocalDate purchase_at ;

}
