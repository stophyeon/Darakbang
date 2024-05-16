package org.example.service.purchase;

import org.example.dto.purchase.PaymentsReq;
import org.example.dto.purchase.ProductFeignReq;
import org.example.dto.purchase.ProductFeignRes;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

//@FeignClient(name = "ProductApi",url = "http://localhost:7080/product")
@FeignClient(name = "ProductApi",url = "http://darakbang-product-service-1:7080/product")
public interface ProductFeign {
    @PostMapping("/payments/sell")
    public ProductFeignRes SoldOut(@RequestBody ProductFeignReq productFeignReq);

    @GetMapping("/real_image")
    public String getRealImage(@RequestParam("product_id") Long productId);
    @PostMapping("/emails/{consumer_email}")
    public String SendEmail(@RequestBody List<PaymentsReq> paymentsReqList, @PathVariable("consumer_email") String consumer_email);

}
