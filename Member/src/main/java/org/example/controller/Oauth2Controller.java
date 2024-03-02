package org.example.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import lombok.RequiredArgsConstructor;
import net.minidev.json.parser.ParseException;
import org.example.service.kakao.KakaoService;
import org.example.service.naver.NaverService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
public class Oauth2Controller {
    private final KakaoService kakaoService;
    private final NaverService naverService;
    @GetMapping("/oauth2/kakao")
    public String kakaoToken(@RequestParam("code") String code) throws JsonProcessingException {
        return kakaoService.getToken(code);
    }

    @GetMapping("/kakao/info")
    public String KakaoMemberInfo() throws ParseException, JsonProcessingException {
        return kakaoService.getInfo().getNickName();
    }
    @GetMapping("oauth2/naver")
    public String naverToken(@RequestParam("code") String code) throws JsonProcessingException {
        return naverService.getAccessToken(code);
    }
    @GetMapping("/naver/info")
    public String NaverMemberInfo() throws ParseException, JsonProcessingException {
        return kakaoService.getInfo().getNickName();
    }
}
