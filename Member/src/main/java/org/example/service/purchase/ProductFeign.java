package org.example.service.purchase;

import org.example.dto.product.ProductFeignReq;
import org.example.dto.product.ProductFeignRes;
import org.example.dto.product.SendProduct;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;


//@FeignClient(name = "ProductApi",url = "http://localhost:7080/product")
@FeignClient(name = "ProductApi",url = "http://darakbang-product-service-1:7080/product")
public interface ProductFeign {
    @PostMapping("/payments/sell")
    public ProductFeignRes SoldOut(@RequestBody ProductFeignReq productFeignReq);

    @GetMapping("/real_image")
    public SendProduct getRealImage(@RequestParam("product_id") Long productId);
}
