package org.example.service.kakao;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import net.minidev.json.JSONObject;
import net.minidev.json.parser.JSONParser;
import net.minidev.json.parser.ParseException;
import org.example.dto.MemberDto;
import org.example.entity.Member;
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
    public String getToken(String code) throws JsonProcessingException {
        ObjectMapper objectMapper = new ObjectMapper();
        kakaoToken=objectMapper.readValue(kakaoFeign.getAccessToken(Content_type,grant_type,client_id,login_redirect,code), KakaoToken.class);
        return kakaoToken.toString();
    }
    public Member getInfo() throws ParseException, JsonProcessingException {
        JSONParser jsonParser = new JSONParser();
        JSONObject jsonObject = (JSONObject) jsonParser.parse(kakaoApi.getUSerInfo("Bearer "+kakaoToken.getAccessToken()));
        JSONObject properties = (JSONObject) jsonObject.get("properties");
        log.info(jsonObject.toString());
        log.info(properties.toString());
        JSONObject account = (JSONObject) jsonObject.get("kakao_account");
        log.info(account.toString());
        MemberDto memberDto = MemberDto.builder()
                .email(account.get("email").toString())
                .nickName(properties.get("nickname").toString())
                .build();
        Member member=Member.builder()
                .memberDto(memberDto)
                .build();
        if (memberRepository.findByEmail(member.getEmail()).isEmpty()){memberRepository.save(member);}
        return member;
    }
}
