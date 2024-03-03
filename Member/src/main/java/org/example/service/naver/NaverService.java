package org.example.service.naver;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.example.jwt.NaverToken;
import org.springframework.stereotype.Service;

@Service
@Slf4j
@RequiredArgsConstructor
public class NaverService {
    private final NaverFeign naverFeign;
    private final NaverApi naverApi;
    private final String client_id="3OGCudku4yOAQaRE_ou3";
    private final String redirect_uri="http%3a%2f%2flocalhost%3a8080%2foauth2%2fnaver";
    //url 인코딩 값
    private final String client_secret="gVeTyZ76l7";
    private final String grant_type="authorization_code";
    //1) 발급:'authorization_code'
    //2) 갱신:'refresh_token'
    //3) 삭제: 'delete'
    private final String state="1234";
    private NaverToken naverToken;
    public String getAccessToken(String code) throws JsonProcessingException {
        ObjectMapper objectMapper = new ObjectMapper();
        naverToken=objectMapper.readValue(naverFeign.getToken(client_id,client_secret,grant_type,code), NaverToken.class);
        log.info(naverToken.getAccessToken());
        return naverToken.toString();
    }
    public String deleteToken(){
        return naverFeign.delToken(client_id,client_secret,"delete", naverToken.getAccessToken());
    }
    public String getUserInfo() throws JsonProcessingException {

        return naverApi.UserInfo("Bearer "+naverToken.getAccessToken());
    }
}
