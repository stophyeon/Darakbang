package com.example.Purchase.controller;

import com.example.Purchase.dto.PurChaseCheck;
import com.example.Purchase.dto.ValidationRequest;
import com.example.Purchase.service.AccessTokenService;
import com.example.Purchase.service.PaymentService;
import com.example.Purchase.service.PurchaseService;
import com.example.Purchase.service.ValidateService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;

@RestController
@Slf4j
@RequiredArgsConstructor
public class PurchaseController {

    private final AccessTokenService accessTokenService ;

    private final ValidateService validateService;

    private final PurchaseService purchaseService;

    //paymentservice는 portone의 결제 확인 정보를 포함한 내용을
    //purchase는 결제 확인 정보와 검증을 포함한 내용을 전달해야 합니다.


    @CrossOrigin
    @PostMapping("/payments/complete/{useremail}")
    public Mono<ResponseEntity<PurChaseCheck>> validatepayment(@PathVariable(value = "useremail") String useremail, @RequestBody ValidationRequest validation) {
        return accessTokenService.GetToken()
                .flatMap(PortOnetoken -> validateService.getpurchaseinfobyportone(validation.getPayment_id(), PortOnetoken)
                        .flatMap(purchasecheckresponsewebclient -> {
                          return purchaseService.validateandsave(purchasecheckresponsewebclient,validation.getPayment_id(),validation.getPoint_name(),useremail);
                        }));
    }


}
