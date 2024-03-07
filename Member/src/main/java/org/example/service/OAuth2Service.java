package org.example.service;


import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.example.dto.KakaoUser;
import org.example.dto.MemberDto;
import org.example.dto.OAuthAttributes;
import org.example.dto.OAuthMember;
import org.example.entity.Member;
import org.example.repository.MemberRepository;

import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserService;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@Slf4j
@RequiredArgsConstructor
public class OAuth2Service implements OAuth2UserService<OAuth2UserRequest,OAuth2User> {
    private final MemberRepository memberRepository;
    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        OAuth2UserService<OAuth2UserRequest, OAuth2User> delegate = new DefaultOAuth2UserService();
        //Request에서 사용자 정보를 추출
        OAuth2User oAuth2User = delegate.loadUser(userRequest);

        log.info(oAuth2User.getName());
        Map<String, Object> originAttributes = oAuth2User.getAttributes();
        String registrationId = userRequest.getClientRegistration().getRegistrationId();
        String userNameAttributeName = userRequest.getClientRegistration()
                .getProviderDetails().getUserInfoEndpoint().getUserNameAttributeName();


        Map<String, Object> attrs = oAuth2User.getAttributes();

        log.info(attrs.get("properties").toString());
        OAuthMember oAuthMember = OAuthAttributes.extract(registrationId, attrs);
        oAuthMember.setProvider(registrationId);

        Member member = saveOrUpdate(attrs);
        Map<String, Object> customAttribute = customAttribute(attrs, userNameAttributeName, oAuthMember, registrationId);
        return new DefaultOAuth2User(
                Collections.singleton(new SimpleGrantedAuthority("ROLE_USER")),
                customAttribute,
                userNameAttributeName);


    }
    private Map<String, Object> customAttribute(Map<String, Object> attributes, String userNameAttributeName, OAuthMember oAuthMember, String registrationId) {
        Map<String, Object> customAttribute = new LinkedHashMap<>();
        customAttribute.put(userNameAttributeName, attributes.get(userNameAttributeName));
        customAttribute.put("provider", registrationId);
        customAttribute.put("name", oAuthMember.getName());
        customAttribute.put("email", oAuthMember.getEmail());
        return customAttribute;

    }
    private Member saveOrUpdate(Map<String,Object> attrs){
        KakaoUser kakaoUser = extractInfo(attrs);
        Optional<Member> m = memberRepository.findByEmail(kakaoUser.getEmail());
        MemberDto memberDto = new MemberDto();
        if(m.isEmpty()){
            memberDto.setEmail(kakaoUser.getEmail());
        }
        memberDto.setNickName(kakaoUser.getNickName());
        memberDto.setImage(kakaoUser.getImage());
        Member member = Member.builder()
                .memberDto(memberDto)
                .build();
        return memberRepository.save(member);

    }
    public KakaoUser extractInfo(Map<String,Object> attrs){
        KakaoUser kakaoUser = new KakaoUser();
        Object properties = attrs.get("properties");
        Object account = attrs.get("kakao_account");
        ObjectMapper objectMapper = new ObjectMapper();
        Map<String,Object> eProperties=objectMapper.convertValue(properties, Map.class);
        Map<String,Object> eAccount=objectMapper.convertValue(account, Map.class);
        kakaoUser.setNickName(eProperties.get("nickname").toString());
        kakaoUser.setImage(eProperties.get("profile_image").toString());
        kakaoUser.setEmail(eAccount.get("email").toString());
        return kakaoUser;
    }


}
