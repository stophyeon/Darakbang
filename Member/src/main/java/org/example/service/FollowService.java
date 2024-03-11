package org.example.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.example.entity.Follow;
import org.example.repository.follow.FollowRepository;
import org.example.repository.member.MemberRepository;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
@Slf4j
@RequiredArgsConstructor
public class FollowService {
    private final FollowRepository followRepository;
    private final MemberRepository memberRepository;
    //Follow 신청 자신이 follower, 상대가 following

    public Follow FollowReq(String email){
        String MyEmail = SecurityContextHolder.getContext().getAuthentication().getName();
        log.info(email);
        log.info(MyEmail);
        Follow follow = Follow.builder()
                .followingId(memberRepository.findId(email))
                .followerId(memberRepository.findId(MyEmail))
                .build();
        log.info(String.valueOf(follow.getFollowerId()));
        log.info(String.valueOf(memberRepository.findId(email)));
        followRepository.save(follow);
        return follow;

    }
}
