package org.example.service;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.example.annotation.TimeCheck;
import org.example.dto.member.MemberDto;
import org.example.entity.Follow;
import org.example.entity.Member;
import org.example.repository.follow.FollowRepository;
import org.example.repository.member.MemberRepository;
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
    @PersistenceContext
    private EntityManager em;
    //Follow 신청 자신이 follower, 상대가 following
    @Transactional
    @TimeCheck
    public String FollowReq(String email,String MyEmail){

        Member following_member = memberRepository.findByEmail(email).get();
        Member follower_member = memberRepository.findByEmail(MyEmail).get();
        if (!followRepository.existsByFollowingIdAndFollowerId(follower_member.getMember_id(),follower_member.getMember_id())){
            Follow follow = Follow.builder()
                    .followingId(following_member.getMember_id())
                    .followerId(follower_member.getMember_id())
                    .build();
            //follow 관계 저장
            em.persist(follow);
            //member의 follower수 수정
            memberRepository.updateFollower(following_member);
            //member의 following수 수정
            memberRepository.updateFollowing(follower_member);

            return "팔로우 요청 성공";
        }
        return "이미 팔로우한 상태";
    }

    @TimeCheck
    public List<MemberDto> getFollower(String nickName){
        return followRepository.findFollower(nickName).stream().map(Member::toDto).toList();

    }

    @TimeCheck
    public List<MemberDto> getFollowing(String nickName){
        return followRepository.findFollowing(nickName).stream().map(Member::toDto).toList();
    }



}
