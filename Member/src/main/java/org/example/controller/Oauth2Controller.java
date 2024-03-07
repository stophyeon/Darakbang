package org.example.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import lombok.RequiredArgsConstructor;
import net.minidev.json.parser.ParseException;
import org.example.service.kakao.KakaoFeign;
import org.example.service.kakao.KakaoService;
import org.example.service.naver.NaverService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/oauth/authorization")
public class Oauth2Controller {
    private final KakaoService kakaoService;
    private final NaverService naverService;
    private final KakaoFeign kakaoFeign;
    //@GetMapping("/kakao")
//    public ResponseEntity<String> kakaoToken(@RequestParam("code") String code) throws JsonProcessingException, ParseException {
//        return ResponseEntity.ok(kakaoService.getKakaoInfo(code));
//    }


    //@GetMapping("/naver")
    //public ResponseEntity<String> naverToken(@RequestParam("code") String code) throws JsonProcessingException {
    //    return ResponseEntity.ok(naverService.getNaverInfo(code));
   // }



}
