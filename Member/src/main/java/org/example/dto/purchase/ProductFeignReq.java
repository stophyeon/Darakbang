package org.example.dto.purchase;

import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;

import java.util.List;

@Data
@RequiredArgsConstructor
public class ProductFeignReq {
    private String email;
    private List<Long> product_id;

    @Builder
    public ProductFeignReq(String email, List<Long> product_id){
        this.email=email;
        this.product_id=product_id;
    }
}
