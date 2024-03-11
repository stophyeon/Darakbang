package org.example.service;

import org.example.TestConfig;
import org.example.entity.Follow;
import org.example.repository.follow.FollowRepository;
import org.example.repository.member.MemberRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.test.context.ContextConfiguration;

import static org.junit.jupiter.api.Assertions.*;
@SpringBootTest
@ContextConfiguration(classes = TestConfig.class)
class FollowServiceTest {
    @Autowired
    MemberRepository memberRepository;
    @Autowired
    FollowRepository followRepository;
    @Test
    void followReq() {

        Follow follow = Follow.builder()
                .followingId(memberRepository.findId("jj6778@naver.com"))
                .followerId(memberRepository.findId("j6778@naver.com"))
                .build();

        //followRepository.save(follow);
       System.out.println(follow.getFollowerId());
       System.out.println(follow.getFollowingId());


    }
}