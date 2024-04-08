package org.example.service;


import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.example.dto.LoginSuccessDto;
import org.example.dto.MemberDto;
import org.example.dto.ResponseCustom;
import org.example.entity.Member;
import org.example.jwt.JwtProvider;
import org.example.repository.member.MemberRepository;
import org.example.service.storage.StorageService;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.util.Optional;

@Service
@Slf4j
@RequiredArgsConstructor
public class MemberService {
    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationProvider authenticationProvider;
    private final StorageService storageService;
    private final JwtProvider jwtProvider;

    private final String googleURL = "https://storage.googleapis.com/darakban-img/";



    public boolean duplicate(MemberDto memberDto){
        return memberRepository.findByEmail(memberDto.getEmail()).isEmpty();
    }
    @Transactional
    public ResponseCustom join(MemberDto memberDto, MultipartFile profileImg) throws IOException {
        if (!duplicate(memberDto)){
            return ResponseCustom.builder()
                    .message("이미 가입되어 있는 회원입니다.")
                    .state("중복된 이메일")
                    .build();
        }
        else {
            if(!profileImg.isEmpty()){
                String file_name=storageService.imageUpload(profileImg);
                memberDto.setImage(googleURL+file_name);
            }
            memberDto.setPassword(passwordEncoder.encode(memberDto.getPassword()));

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

    public LoginSuccessDto login(MemberDto memberDto){
        if (memberRepository.findByEmail(memberDto.getEmail()).isPresent()){
            UsernamePasswordAuthenticationToken token = new UsernamePasswordAuthenticationToken(memberDto.getEmail(),memberDto.getPassword());
            Authentication auth = authenticationProvider.authenticate(token);
            return LoginSuccessDto.builder()
                    .message("로그인 성공")
                    .jwtDto(jwtProvider.createToken(auth)).
                    build();
        }
        else {
            return LoginSuccessDto.builder()
                    .message("회원가입하지않은 회원")
                    .build();
        }

    }
    public MemberDto myProfile(String email){
        Optional<Member> member = memberRepository.findByEmail(email);
        if (member.isPresent()){
            return Member.toDto(member.get());
        }
        else {
            return MemberDto.builder().email("No Such Email").build();
        }
    }
    public MemberDto profile(String nickName) {
        log.info(nickName);
        Optional<Member> member = memberRepository.findByNickName(nickName);
        if (member.isPresent()){
            return Member.toDto(member.get());
        }
        else {
            return MemberDto.builder().email("No Such NickName").build();
        }
    }
    public boolean duplicateNickName(String nickName){
        return memberRepository.findByNickName(nickName).isPresent();
    }
    public String getNickName(String email){
        Optional<Member> member = memberRepository.findByEmail(email);
        if (member.isPresent()){return member.get().getNickName();}
        else {return "No Such NickName";}
    }
    public ResponseCustom updateProfile(MultipartFile profileImg,MemberDto memberDto,String email) throws IOException {
        Optional<Member> member = memberRepository.findByEmail(email);
        if (member.isPresent()){
            if (!profileImg.isEmpty()){
                String file_name=storageService.imageUpload(profileImg);
                memberDto.setImage(googleURL+file_name);
                storageService.imageDelete(email);
            }
            memberDto.setImage(member.get().getImage());
            memberRepository.updateInfo(Member.builder().memberDto(memberDto).build());
            return ResponseCustom.builder()
                    .state("success")
                    .message("회원 정보 수정에 성공했습니다.")
                    .build();
        }
        return ResponseCustom.builder()
                .state("fail")
                .message("회원가입 되어있지않은 회원입니다.")
                .build();
    }


}
