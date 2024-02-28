package org.example.service;

import lombok.RequiredArgsConstructor;
import org.example.dto.MemberDetails;
import org.example.entity.Member;
import org.example.repository.MemberRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class MemberDetailService implements UserDetailsService {
    private final MemberRepository memberRepository;
    @Override
    public MemberDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Member member= Optional.of(memberRepository.findByEmail(username).get()).orElseThrow(()->new UsernameNotFoundException("회원가입이 되있지 않았습니다"));
        return MemberDetails.builder()
                .email(member.getEmail())
                .password(member.getPassword())
                .build();
    }
}
