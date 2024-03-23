package org.example.service;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;


@Service
@RequiredArgsConstructor
public class GetEmailService {

    private final WebClient webclient = WebClient.builder().baseUrl("").build();

    //email 요청
    public String getEmail(String jwt)
    {
        return webclient.get()
            .uri("http://localhost:8080/member/info")// member4와 같이 변경 필요
            .header("Authorization",  jwt  )
            .retrieve()
            .bodyToMono(String.class).block();
    }

}
