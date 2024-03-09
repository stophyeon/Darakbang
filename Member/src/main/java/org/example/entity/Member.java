package org.example.entity;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.Email;
import lombok.Builder;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.example.dto.MemberDto;

import java.time.LocalDate;
import java.util.Date;

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
