package org.example.controller;


import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.example.dto.OrderSaveRequest;
import org.example.dto.SuccessRes;
import org.example.dto.PortOne.ValidationRequest;
import org.example.service.*;
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

    private final InteractionService interactionService ;

    private final OrderService orderService ;
    //paymentservice는 portone의 결제 확인 정보를 포함한 내용을
    //purchase는 결제 확인 정보와 검증을 포함한 내용을 전달해야 합니다.


    //한개 결제시 .

    @PostMapping("/payments/complete/{useremail}")
    public Mono<ResponseEntity> validatepaymentone(@PathVariable(value = "useremail") String useremail, @RequestBody ValidationRequest validation) {
        return accessTokenService.GetToken()
                .flatMap(PortOnetoken -> validateService.getpurchaseinfobyportone(validation.getPayment_id(), PortOnetoken)
                        .flatMap(purchasecheckresponsewebclient -> purchaseService.validateandsave(purchasecheckresponsewebclient,validation.getPayment_id(), (long) validation.getDifference_amount(),useremail)
                                .flatMap(changememberpoint -> interactionService.changePointMember(validation,useremail))
                                        .flatMap(ordersave -> {return Mono.just(orderService.saveOrder(validation,useremail));
                                        }))) ;
    }


    @PostMapping("/payments/complete")
    public ResponseEntity<SuccessRes> saveOrder(@RequestBody OrderSaveRequest orderSaveRequests)
    {
        return orderService.saveOrderInteract(orderSaveRequests) ;
    }


}
