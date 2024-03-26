package com.example.Purchase.service;

import com.example.Purchase.domain.Point;
import com.example.Purchase.dto.CancelRequest;
import com.example.Purchase.dto.CancelResponse;
import com.example.Purchase.dto.PointChangeFormat;
import com.example.Purchase.dto.PurChaseCheck;
import com.example.Purchase.repository.PointRepository;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
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

    private final PointRepository pointRepository;

    private final PaymentService paymentService;

    private final WebClient webClient = WebClient.builder().baseUrl("https://api.portone.io").build();

    private final ChangeMemberPointService changeMemberPointService;


    public Mono<ResponseEntity<PurChaseCheck>> validateandsave(PurChaseCheck purchasecheckbyportone, String paymentid, String pointname) {
        Point point = pointRepository.findByPointName(pointname);
        int purchaseprice = point.getPointPrice();
        int pointamount = point.getPointAmount();

        if (purchasecheckbyportone.getAmount().getTotal() == purchaseprice) {

                return paymentService.SavePaymentInfo(
                        paymentid,
                        purchasecheckbyportone.getStatus(),
                        purchasecheckbyportone.getRequestedAt(),
                        purchasecheckbyportone.getOrderName(),
                        pointamount,
                        "구매한 사용자 email" // 여기에 실제 이메일 (인증. 인가 후)를 넣어야 합니다.
                ).flatMap(savedPayment-> {
                    PointChangeFormat pointChangeFormat = new PointChangeFormat("구매한 사용자 이메일", pointamount); // 여기에 실제 이메일 (인증. 인가 후)를 넣어야 합니다.
                    return changeMemberPointService.changePointByEmail(pointChangeFormat, "구매한 사용자 이메일") // 여기에 실제 이메일 (인증. 인가 후)를 넣어야 합니다.
                            .map(response -> {
                                return ResponseEntity.ok(purchasecheckbyportone);
                            });
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
