package org.example.service.kakao;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;

@Component
@FeignClient(name = "kakaoApi",url = "https://kapi.kakao.com")
public interface KakaoApi {
    @GetMapping("/v2/user/me")
    public String getUSerInfo(@RequestHeader("Authorization") String token);
}
