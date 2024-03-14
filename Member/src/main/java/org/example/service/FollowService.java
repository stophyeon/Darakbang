package org.example.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.example.entity.Follow;
import org.example.entity.Member;
import org.example.repository.follow.FollowRepository;
import org.example.repository.member.MemberRepository;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Slf4j
@RequiredArgsConstructor
public class FollowService {
    private final FollowRepository followRepository;
    private final MemberRepository memberRepository;
    //Follow 신청 자신이 follower, 상대가 following
    @Transactional
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
        //follow 관계 저장
        followRepository.save(follow);
        //member의 follower수 수정
        memberRepository.updateFollower(following_member);
        //member의 following수 수정
        memberRepository.updateFollowing(follower_member);

        return follow;
    }
    public List<Member> getFollower(String nickName){
        Optional<Member> member = memberRepository.findByNickName(nickName);
        return followRepository.findFollower(member.get());
    }
    public List<Member> getFollowing(String nickName){
        Optional<Member> member = memberRepository.findByNickName(nickName);
        return followRepository.findFollowing(member.get());
    }


}
