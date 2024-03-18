package org.example.service;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.example.annotation.TimeCheck;
import org.example.entity.Follow;
import org.example.entity.Member;
import org.example.repository.follow.FollowRepository;
import org.example.repository.member.MemberRepository;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;

@Service
@Slf4j
@RequiredArgsConstructor
public class FollowService {
    private final FollowRepository followRepository;
    private final MemberRepository memberRepository;
    @PersistenceContext
    private EntityManager em;
    //Follow 신청 자신이 follower, 상대가 following
    @Transactional
    @TimeCheck
    public Follow FollowReq(String email){
        String MyEmail = SecurityContextHolder.getContext().getAuthentication().getName();
        Member following_member = memberRepository.findByEmail(email).get();
        Member follower_member = memberRepository.findByEmail(MyEmail).get();
        Follow follow = Follow.builder()
                .followingId(following_member)
                .followerId(follower_member)
                .build();
        //follow 관계 저장
        em.persist(follow);
        //followRepository.save(follow);
        //member의 follower수 수정
        memberRepository.updateFollower(following_member);
        //member의 following수 수정
        memberRepository.updateFollowing(follower_member);

        return follow;
    }

    @TimeCheck
    public List<Member> getFollower(String nickName){
        Optional<Member> member = memberRepository.findByNickName(nickName);
        return followRepository.findFollower(member.get());
    }
    @TimeCheck
    public List<Member> getFollowing(String nickName){


        Optional<Member> member = memberRepository.findByNickName(nickName);
        return followRepository.findFollowing(member.get());



    }



}
