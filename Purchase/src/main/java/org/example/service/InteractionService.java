package org.example.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.example.dto.PaymentsRes;

import org.example.dto.PurchaseDto;
import org.example.dto.ValidationRequest;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class InteractionService {

    private final WebClient webClientforMember = WebClient.builder().baseUrl("http://localhost:8080/member").build() ;
    //private final WebClient webClientforMember = WebClient.builder().baseUrl("http://darakbang-member-service-1:8080/member").build() ;
    public Mono<PaymentsRes> changePointMember(ValidationRequest validationRequest, String email)
    {
        PurchaseDto purchaseDto = new PurchaseDto();
        purchaseDto.setEmail(email); // 구매자 이메일 설정
        purchaseDto.setTotal_point(validationRequest.getTotal_point());
        purchaseDto.setPayments_list(validationRequest.getPayments_list());

        log.info("{}", validationRequest.getPayments_list().get(0).getProduct_id());
        //여기까지 잘 온다.



        Mono<PaymentsRes> responsemono = webClientforMember.post()
                .uri("/payments")
                .contentType(MediaType.APPLICATION_JSON)
                .body(BodyInserters.fromValue(purchaseDto))
                .retrieve()
                .bodyToMono(PaymentsRes.class);

        return responsemono;

    }

}
