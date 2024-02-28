package org.example.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import lombok.RequiredArgsConstructor;
import net.minidev.json.parser.ParseException;
import org.example.dto.MemberDto;
import org.example.jwt.JwtDto;
import org.example.service.KakaoService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
public class Oauth2Controller {
    private final KakaoService kakaoService;
    @GetMapping("/oauth2/kakao")
    public String index(@RequestParam("code") String code) throws JsonProcessingException {
        return kakaoService.getToken(code);
    }

    @GetMapping("/info")
    public String MemberInfo() throws ParseException, JsonProcessingException {
        return kakaoService.getInfo().getNickName();
    }
}
