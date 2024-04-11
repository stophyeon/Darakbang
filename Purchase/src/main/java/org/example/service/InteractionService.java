package org.example.service;

import lombok.RequiredArgsConstructor;
import org.example.dto.PaymentsRes;
import org.example.dto.PointChangeRequest;
import org.example.dtoforportone.ValidationRequest;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

@Service
@RequiredArgsConstructor
public class InteractionService {

    private final WebClient webClientforMember = WebClient.builder().baseUrl("http://localhost:8080/member").build() ;

    private final WebClient webClientforProduct =  WebClient.builder().baseUrl("http://localhost:7080/product").build();

    public Mono<PaymentsRes> changePointMember(ValidationRequest validationRequest, String email)
    {
        PointChangeRequest pointChangeRequest = PointChangeRequest.builder()
                .product_id(validationRequest.getProduct_id())
                .consumer(email)
                .seller(validationRequest.getSeller_email())
                .total_price(validationRequest.getOriginal_amount()) //판 상품 금액만
                .build() ;

        Mono<PaymentsRes> responsemono = webClientforMember.post()
                .uri("/payments")
                .contentType(MediaType.APPLICATION_JSON)
                .body(BodyInserters.fromValue(pointChangeRequest))
                .retrieve()
                .bodyToMono(PaymentsRes.class);

        return responsemono;

    }

//    public Mono<?> changeProductStatus(long productId)
//    {
//        Mono<?> responsemono = webClientforProduct.post()
//                .uri("/payments")
//                .retrieve()
//                .bodyToMono(<?>) ;
//
//        return responsemono;
//
//    }
}
