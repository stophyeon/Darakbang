package org.example.controller;


import lombok.RequiredArgsConstructor;
import org.example.dto.*;
import org.example.service.*;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;

import java.sql.Timestamp;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.OffsetDateTime;
import java.time.format.DateTimeFormatter;
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
                        .flatMap(purchasecheckresponsewebclient -> purchaseService.validateandsave(purchasecheckresponsewebclient,validation.getPayment_id(), validation.getTotal_point(),useremail)
                                .flatMap(changememberpoint -> {
                                    return interactionService.changePointMember(validation,useremail) ;
                                }))) ;

    }


//    @PostMapping("/payments/test/{useremail}")
//    public Mono<ResponseEntity<PurChaseCheck>> validatepaymentonetest(@PathVariable(value = "useremail") String useremail, @RequestBody ValidationRequest validation) {
//        PaymentAmount paymentAmount = new PaymentAmount(validation.getTotal_point());
//        String requestedAtString = "2024-04-13T10:09:00.769Z";// 포트원 예시
//
//        PurChaseCheck purchasetest = new PurChaseCheck(validation.getPayment_id(), requestedAtString, paymentAmount, "hoho");
//        return purchaseService.validateandsave(purchasetest, validation.getPayment_id(), validation.getTotal_point(), useremail);
//    }


    @PostMapping("/payments/complete")
    public ResponseEntity<PaymentsRes> saveOrder(@RequestBody List<OrderSaveRequest> orderSaveRequestList)
    {
        return orderService.saveOrderInteract(orderSaveRequestList) ;
    }


}
