package org.example.service.purchase;

import org.example.dto.purchase.PaymentsReq;
import org.example.dto.purchase.ProductFeignReq;
import org.example.dto.purchase.ProductFeignRes;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;


@FeignClient(name = "ProductApi",url = "http://localhost:7080/product")
//@FeignClient(name = "ProductApi",url = "http://darakbang-product-service-1:7080/product")
public interface ProductFeign {
    @PostMapping("/payments/sell")
    public ProductFeignRes SoldOut(@RequestBody ProductFeignReq productFeignReq);

    @PostMapping("/emails")
    public ProductFeignRes SendEmail(@RequestBody List<PaymentsReq> paymentsReqList);

}
