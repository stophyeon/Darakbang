package org.example.service;


import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.example.dto.PointChangeFormat;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

@Service
@NoArgsConstructor
@Slf4j
public class ChangeMemberPointService {


    private final WebClient webClient = WebClient.builder().baseUrl("").build();
    //지현이형에게 요청

    public Mono<String> changePointByEmail(PointChangeFormat pointChangeFormat) {
        return webClient
                .post()
                //.uri("http://localhost:8888/member/point")
                .uri("http://darakbang-member-service-1:8080/member/point")
                .contentType(MediaType.APPLICATION_JSON)
                .body(BodyInserters.fromValue(pointChangeFormat))
                .retrieve()
                .bodyToMono(String.class);
    }
}
