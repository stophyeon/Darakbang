package org.example.entity;


import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.example.dto.MemberDto;
import org.hibernate.annotations.ColumnDefault;

import java.util.List;

@Entity
@RequiredArgsConstructor
@Getter
public class Member {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long member_id;
    private String email;
    private String name;
    private String password;
    private String phoneNumber;
    private String nickName;
    private int point;
    private String image;
    @ColumnDefault("0")
    private int follower;
    @ColumnDefault("0")
    private int following;

    private final String role="ROLE_USER";
    @Builder
    public Member(MemberDto memberDto){
        this.email=memberDto.getEmail();
        this.password= memberDto.getPassword();
        this.nickName= memberDto.getNickName();
        this.phoneNumber= memberDto.getPhoneNumber();
        this.name= memberDto.getName();
        this.image=memberDto.getImage();
    }



}
