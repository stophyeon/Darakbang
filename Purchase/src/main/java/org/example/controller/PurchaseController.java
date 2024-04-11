package org.example.controller;


import lombok.RequiredArgsConstructor;
import org.example.dto.OrderSaveRequest;
import org.example.dto.PaymentsRes;
import org.example.dto.Portone.ValidationRequest;
import org.example.service.*;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class PurchaseController {

    private final AccessTokenService accessTokenService ;

    private final ValidateService validateService;

    private final PurchaseService purchaseService;

    private final InteractionService interactionService ;

    private final OrderService orderService ;
    //paymentservice는 portone의 결제 확인 정보를 포함한 내용을
    //purchase는 결제 확인 정보와 검증을 포함한 내용을 전달해야 합니다.


    //한개 결제시 .

    @PostMapping("/payments/complete/{useremail}")
    public Mono<PaymentsRes> validatepaymentone(@PathVariable(value = "useremail") String useremail, @RequestBody ValidationRequest validation) {
        return accessTokenService.GetToken()
                .flatMap(PortOnetoken -> validateService.getpurchaseinfobyportone(validation.getPayment_id(), PortOnetoken)
                        .flatMap(purchasecheckresponsewebclient -> purchaseService.validateandsave(purchasecheckresponsewebclient,validation.getPayment_id(), (long) validation.getDifference_amount(),useremail)
                                .flatMap(changememberpoint -> {
                                    return interactionService.changePointMember(validation,useremail) ;
                                }))) ;

    }


    @PostMapping("/payments/complete")
    public ResponseEntity<PaymentsRes> saveOrder(@RequestBody List<OrderSaveRequest> orderSaveRequestList)
    {
        return orderService.saveOrderInteract(orderSaveRequestList) ;
    }


}
