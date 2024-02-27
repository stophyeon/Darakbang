package org.example.service;

import lombok.extern.slf4j.Slf4j;
import org.example.dto.MemberDto;
import org.example.dto.ResponseCustom;
import org.example.entity.Member;
import org.example.repository.MemberRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.Optional;

@Service
@Slf4j
public class MemberService {
    private final MemberRepository memberRepository;

    public MemberService(MemberRepository memberRepository) {
        this.memberRepository = memberRepository;
    }
    public boolean duplicate(MemberDto memberDto){
        return memberRepository.findByEmail(memberDto.getEmail()).isPresent();
    }
    @Transactional
    public ResponseCustom join(MemberDto memberDto){
        if (duplicate(memberDto)){
            return ResponseCustom.builder()
                    .message("이미 가입되어 있는 회원입니다.")
                    .state("중복된 이메일")
                    .build();
        }
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
