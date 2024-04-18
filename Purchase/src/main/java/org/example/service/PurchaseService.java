package org.example.service;


import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.example.dto.CancelRequest;
import org.example.dto.CancelResponse;
import org.example.dto.PurChaseCheck;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;


@Service
@AllArgsConstructor
@Slf4j
public class PurchaseService {


    private final PaymentService paymentService;

    private final WebClient webClient = WebClient.builder().baseUrl("https://api.portone.io").build();




    public Mono<ResponseEntity<PurChaseCheck>> validateandsave(PurChaseCheck purchasecheckbyportone, String paymentid, int frontpayamount, String useremail) {

        //프론트에서 전달한 결제 정보가 일치한지, portone에서 실제로 했던 결제 금액이 일치한지 확인
        if (purchasecheckbyportone.getAmount().getTotal() == frontpayamount) {
                return paymentService.SavePaymentInfo(
                        paymentid,
                        purchasecheckbyportone.getStatus(),
                        purchasecheckbyportone.getRequestedAt(),
                        purchasecheckbyportone.getOrderName(),
                        frontpayamount,
                        useremail
                ).map(response -> {
                                return ResponseEntity.ok(purchasecheckbyportone);
                });


        } else {
            CancelRequest cancelRequest = new CancelRequest("결제 금액과 DB 확인 결과 맞지 않습니다");
            Mono<CancelResponse> cancelResponseMono = webClient
                    .post()
                    .uri("/payments/{paymentId}/cancel", paymentid)
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(BodyInserters.fromValue(cancelRequest))
                    .retrieve()
                    .bodyToMono(CancelResponse.class);

            return cancelResponseMono.map(response -> ResponseEntity.badRequest().build());
        }
    }


}
