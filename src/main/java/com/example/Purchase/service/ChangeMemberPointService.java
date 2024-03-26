package com.example.Purchase.service;

import com.example.Purchase.dto.PointChangeFormat;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;
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

    public Mono<String> changePointByEmail(PointChangeFormat pointChangeFormat, String useremail) {
        return webClient
                .post()
                .uri("http://localhost:8080/member/point")
                //localhost부를 member container명으로 확인.
//                .header("Authorization",  jwt)  jwt 제거로 인한 헤더부 제거
                //email을 받아오는 형태로 uri 변경 필요할 가능성.
                .contentType(MediaType.APPLICATION_JSON)
                .body(BodyInserters.fromValue(pointChangeFormat))
                .retrieve()
                .bodyToMono(String.class);
    }
}
