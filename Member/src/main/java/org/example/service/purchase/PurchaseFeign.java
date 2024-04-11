package org.example.service.purchase;

import org.example.dto.PaymentsReq;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@FeignClient(name = "PurchaseApi",url = "http://localhost:6080/payments")
public interface PurchaseFeign {
    @PostMapping("/complete")
    public void saveOrder(@RequestBody PaymentsReq  paymentsReq);
}
