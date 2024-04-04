package org.example.service;

import lombok.RequiredArgsConstructor;

import lombok.extern.slf4j.Slf4j;
import org.example.dto.MemberDto;
import org.example.dto.ResponseCustom;
import org.example.entity.Member;
import org.example.jwt.JwtDto;
import org.example.jwt.JwtProvider;
import org.example.repository.follow.FollowRepository;
import org.example.repository.member.MemberRepository;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.Optional;
import java.util.UUID;


@Service
@Slf4j
@RequiredArgsConstructor
public class MemberService {
    private final MemberRepository memberRepository;
    private final FollowRepository followRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationProvider authenticationProvider;
    private final JwtProvider jwtProvider;
    @Value("${image.dir}")
    private String imgPath;
    public boolean duplicate(MemberDto memberDto){
        return memberRepository.findByEmail(memberDto.getEmail()).isEmpty();
    }
    @Transactional
    public ResponseCustom join(MemberDto memberDto, MultipartFile img) throws IOException {
        if (!duplicate(memberDto)){
            return ResponseCustom.builder()
                    .message("이미 가입되어 있는 회원입니다.")
                    .state("중복된 이메일")
                    .build();
        }
        else {
            memberDto.setPassword(passwordEncoder.encode(memberDto.getPassword()));
            String origin_name =img.getOriginalFilename();
            String file_name = changedImageName(origin_name);
            img.transferTo(new File(imgPath+"/"+file_name));
            memberDto.setImage(file_name);
            Member member = Member.builder()
                    .memberDto(memberDto)
                    .build();
            memberRepository.save(member);
            return ResponseCustom.builder()
                    .message("회원가입 되었습니다")
                    .state("처리 성공")
                    .build();
        }

    }
    private static String changedImageName(String originName) {
        String random = UUID.randomUUID().toString();
        return random+originName;
    }
    public JwtDto login(MemberDto memberDto){
        UsernamePasswordAuthenticationToken token = new UsernamePasswordAuthenticationToken(memberDto.getEmail(),memberDto.getPassword());
        Authentication auth = authenticationProvider.authenticate(token);
        return jwtProvider.createToken(auth);
    }

    public MemberDto profile(String nickName,String email) {
        log.info(nickName);
        if (nickName.equals("me")) {
            return Member.toDto(memberRepository.findByEmail(email).get());
        }
        else {return Member.toDto(memberRepository.findByNickName(nickName).get());}
    }
    public boolean duplicateNickName(String nickName){
        return memberRepository.findByNickName(nickName).isPresent();
    }
    public String getNickName(String email){
        return memberRepository.findByEmail(email).get().getNickName();
    }
}
