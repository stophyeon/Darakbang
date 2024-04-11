package org.example.service;


import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.example.dtoforportone.PortoneTokenRequest;
import org.example.dtoforportone.PortoneTokenResponse;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

@Service
@NoArgsConstructor
@Slf4j
public class AccessTokenService {

    private final WebClient webClient = WebClient.builder().baseUrl("https://api.portone.io").build();


    //portone에서 결제 조회를 하려면, portonetoken이 필요합니다. 해당 token을 가져오는부 입니다.
    //사이트 내부적으로 너무 빨리 갱신하여, 매번 가져오는 형태로 변경하였습니다.

    public Mono<String> GetToken() {
        PortoneTokenRequest portoneTokenRequest = new PortoneTokenRequest("hM546ISQZ7vQ61xw0eTV0hk7GpRDS48Pr92uTBGbCc5z9u4iSC3DiMed3SHBohBQHWj8ZEPHJF6J8VNA");

        Mono<String> PortoneTokenmono = webClient
                .post()
                .uri("/login/api-secret")
                .contentType(MediaType.APPLICATION_JSON)
                .body(BodyInserters.fromValue(portoneTokenRequest))
                .retrieve()
                .bodyToMono(PortoneTokenResponse.class)
                .map(PortoneTokenResponse::getAccessToken);

      return PortoneTokenmono;

    }

}