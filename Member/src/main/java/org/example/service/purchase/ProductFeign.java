package org.example.service.purchase;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

@FeignClient(name = "ProductApi",url = "http://localhost:7080/product")
public interface ProductFeign {
    @PostMapping("/payments")
    public boolean changeState(@RequestParam("product_id")Long product_id);

}
