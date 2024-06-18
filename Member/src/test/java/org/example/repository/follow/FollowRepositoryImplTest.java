package org.example.repository.follow;

import org.example.TestConfig;

import org.example.dto.member.MemberDto;
import org.example.entity.Follow;
import org.example.entity.Member;
import org.example.repository.member.MemberRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.jdbc.EmbeddedDatabaseConnection;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.context.annotation.Import;
import org.springframework.jdbc.datasource.embedded.EmbeddedDatabaseType;


import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@DataJpaTest
@Import(TestConfig.class)
class FollowRepositoryImplTest {
    @Autowired
    FollowRepository followRepository;
    @Autowired
    MemberRepository memberRepository;
    MemberDto memberDto= MemberDto.builder().name("정지현").nickName("jjh").build();
    Member member=Member.builder().memberDto(memberDto).build();

    MemberDto memberDto1= MemberDto.builder().name("김민우").nickName("kmw").build();
    Member member1=Member.builder().memberDto(memberDto).build();

    MemberDto memberDto2= MemberDto.builder().name("정재학").nickName("hak").build();
    Member member2=Member.builder().memberDto(memberDto).build();

    Follow follow = Follow.builder()
            .followingId(1L)
            .followerId(2L)
            .build();
    Follow follow2 = Follow.builder()
            .followingId(3L)
            .followerId(2L)
            .build();
    Follow follow1 = Follow.builder()
            .followingId(2L)
            .followerId(3L)
            .build();
    @BeforeEach
    void setup(){

        System.out.println("테스트 시작");
    }
    @Test
    void findFollower() {

        System.out.println(memberRepository.findByNickName("").get().getName());
        List<Member> list=followRepository.findFollower("hak");
        System.out.println(list.size());
        list.forEach(m->System.out.println(m.getName()));
    }

    @Test
    void findFollowing() {
        List<Member> list=followRepository.findFollowing("jjh");
        System.out.println(list.size());
        list.forEach(m->System.out.println(m.getName()));
    }
}