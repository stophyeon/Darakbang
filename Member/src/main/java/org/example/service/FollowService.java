package org.example.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.example.entity.Follow;
import org.example.entity.Member;
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
        Member following_member = memberRepository.findByEmail(email).get();
        Member follower_member = memberRepository.findByEmail(MyEmail).get();
        Follow follow = Follow.builder()
                .followingId(following_member)
                .followerId(follower_member)
                .build();
        log.info(String.valueOf(follow.getFollowerId()));
        followRepository.save(follow);
        memberRepository.updateFollower(follower_member);
        memberRepository.updateFollowing(following_member);
        return follow;
    }


}
