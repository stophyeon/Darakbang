package org.example.service.purchase;

import org.example.dto.product.ProductFeignReq;
import org.example.dto.product.ProductFeignRes;
import org.example.dto.product.MessageRes;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;


//@FeignClient(name = "ProductApi",url = "http://localhost:7080/product")
@FeignClient(name = "ProductApi",url = "http://darakbang-product-service-1:7080/product")
public interface ProductFeign {
    @PostMapping("/payments/sell")
    public ProductFeignRes SoldOut(@RequestBody ProductFeignReq productFeignReq);

    @PostMapping(value = "/real_image",consumes = MediaType.APPLICATION_JSON_VALUE)
    public MessageRes getRealImage(@RequestParam("product_id") Long productId);
}
