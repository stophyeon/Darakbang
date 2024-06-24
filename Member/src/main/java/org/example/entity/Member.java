package org.example.entity;


import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import org.example.dto.member.MemberDto;
import org.hibernate.annotations.ColumnDefault;

@Entity
@RequiredArgsConstructor
@Getter
@Setter
public class Member {
    @Id
    @Column(name = "member_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long member_id;
    private String email;
    private String name;
    private String password;
    private String nickName;
    private String image;
    @ColumnDefault("0")
    private int follower;
    @ColumnDefault("0")
    private int following;
    private int point;
    private final String role="ROLE_USER";
    private int social_type; //0일반 1카카오 2네이버

    @Builder
    public Member(MemberDto memberDto){
        this.email=memberDto.getEmail();
        this.password= memberDto.getPassword();
        this.nickName= memberDto.getNickName();
        this.name= memberDto.getName();
        this.image=memberDto.getImage();
        this.point= memberDto.getPoint();
        this.social_type = memberDto.getSocial_type();
    }
    public static MemberDto toDto(Member member){
        return MemberDto.builder()
                .email(member.getEmail())
                .name(member.getName())
                .nickName(member.getNickName())
                .image(member.getImage())
                .follower(member.follower)
                .following(member.following)
                .point(member.getPoint())
                .build();
    }


}
