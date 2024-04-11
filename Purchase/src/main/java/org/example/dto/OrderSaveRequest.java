package org.example.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.cglib.core.Local;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrderSaveRequest {
    private String seller ;
    private String consumer ;
    private Long product_id ;
    private int product_price;
    private LocalDate created_at ;

}
