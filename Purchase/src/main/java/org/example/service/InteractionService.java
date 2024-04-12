package org.example.service;

import lombok.RequiredArgsConstructor;
import org.example.dto.PaymentsRes;
import org.example.dto.Payments;
import org.example.dto.PointChangeRequest;
import org.example.dto.ProductInfo;
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
public class InteractionService {

    //private final WebClient webClientforMember = WebClient.builder().baseUrl("http://localhost:8080/member").build() ;
    private final WebClient webClientforMember = WebClient.builder().baseUrl("http://darakbang-member-service-1:8080/member").build() ;
    public Mono<PaymentsRes> changePointMember(ValidationRequest validationRequest, String email)
    {
        List<ProductInfo> productInfoList = validationRequest.getProductInfoList() ;


        List<Payments> paymentsList =
                productInfoList.stream()
                        .map(Payments::ToPointChangeProductInfo)
                        .collect(Collectors.toList());

        PointChangeRequest pointChangeRequest = PointChangeRequest.builder()
                .consumer(email)
                .paymentsList(paymentsList)
                .build() ;

        Mono<PaymentsRes> responsemono = webClientforMember.post()
                .uri("/payments")
                .contentType(MediaType.APPLICATION_JSON)
                .body(BodyInserters.fromValue(pointChangeRequest))
                .retrieve()
                .bodyToMono(PaymentsRes.class);

        return responsemono;

    }

}
