package org.example.service.kakao;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;

@Component
@FeignClient(name = "kakaoApi",url = "https://kapi.kakao.com")
public interface KakaoApi {
    @GetMapping("/v2/user/me")
    public String getUSerInfo(@RequestHeader("Authorization") String token);

    @PostMapping(value = "/v2/api/talk/memo/default/send", consumes = "application/x-www-form-urlencoded",produces = "application/json")
    public String sendImage(@RequestHeader("Authorization") String token,
                            @RequestBody String templateObject);

    @PostMapping(value = "/v1/user/logout", consumes = "application/x-www-form-urlencoded")
    public void kakaoLogOut(@RequestHeader("Authorization") String token);

}