package org.example.service.purchase;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

//@FeignClient(name = "ProductApi",url = "http://localhost:7080/product")
@FeignClient(name = "ProductApi",url = "http://darakbang-product-service-1:7080/product")
public interface ProductFeign {
    @PostMapping("/payments/sell")
    public boolean changeStateSuccess(@RequestParam("product_id")Long product_id,@RequestParam("state") int state);
    @PostMapping("/payments/fail")
    public boolean changeStateFail(@RequestParam("product_id")Long product_id,@RequestParam("state") int state);

}
