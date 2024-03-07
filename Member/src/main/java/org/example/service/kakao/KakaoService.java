package org.example.service.kakao;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import net.minidev.json.parser.ParseException;
import org.example.jwt.KakaoToken;
import org.example.repository.MemberRepository;
import org.springframework.stereotype.Service;


@Service
@Slf4j
@RequiredArgsConstructor
public class KakaoService {
    private final KakaoApi kakaoApi;
    private final KakaoFeign kakaoFeign;
    private final MemberRepository memberRepository;

    private final String Content_type ="application/x-www-form-urlencoded;charset=utf-8";

    private final String grant_type = "authorization_code";
    private final String client_id = "b9759cba8e0cdd5bcdb9d601f5a10ac1";
    private final String login_redirect ="http://localhost:8080/oauth2/kakao";
    private final String logout_redirect ="http://localhost:8080";
    private KakaoToken kakaoToken;
    public KakaoToken getToken(String code) throws JsonProcessingException {
        ObjectMapper objectMapper = new ObjectMapper();
        kakaoToken=objectMapper.readValue(kakaoFeign.getAccessToken(Content_type,grant_type,client_id,login_redirect,code), KakaoToken.class);
        log.info(kakaoToken.toString());
        return kakaoToken;
    }
    public String getKakaoInfo(String code) throws ParseException, JsonProcessingException {
        return kakaoApi.getUSerInfo("Bearer "+getToken(code).getAccessToken());
    }
    public String kakaoLogout(){
        return kakaoFeign.logOut(client_id,logout_redirect);
    }
}
