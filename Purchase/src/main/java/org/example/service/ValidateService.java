package org.example.service;

import lombok.NoArgsConstructor;
import org.example.dto.Portone.PurChaseCheck;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

@Service
@NoArgsConstructor
public class ValidateService {


    //결제한 정보중 paymentid를 가지고(결제시는 paymentid만 response 됩니다)
    // 다시 api 호출하여 결제 정보를 가져옵니다.
    private final WebClient webClient = WebClient.builder().baseUrl("https://api.portone.io").build();

    public Mono<PurChaseCheck> getpurchaseinfobyportone(String paymentid, String token)
    {
        Mono<PurChaseCheck> purchasecheck = webClient.get()
                .uri("/payments/{paymentId}", paymentid)
                .header("Authorization", "Bearer " + token)
                .retrieve()
                .bodyToMono(PurChaseCheck.class) ;

        return purchasecheck ;

    }

}
