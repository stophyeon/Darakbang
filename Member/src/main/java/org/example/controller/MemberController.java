package org.example.controller;

import lombok.RequiredArgsConstructor;
import org.example.dto.FollowDto;
import org.example.dto.MemberDto;
import org.example.dto.PointRequest;
import org.example.dto.ResponseCustom;
import org.example.entity.Member;
import org.example.jwt.JwtDto;
import org.example.service.FollowService;
import org.example.service.kakao.KakaoService;
import org.example.service.MemberService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
@RequestMapping("/member")
public class MemberController {
    private final MemberService memberService;
    private final FollowService followService;



    @PostMapping("/signup")
    public ResponseEntity<ResponseCustom> signup(@RequestBody MemberDto memberDto){
        return ResponseEntity.ok(memberService.join(memberDto));
    }
    @PostMapping("/login")
    public ResponseEntity<JwtDto> follow(@RequestBody MemberDto memberDto){
        JwtDto jwtDto = memberService.login(memberDto);
        return ResponseEntity.ok(jwtDto);
    }
    @GetMapping("/info")
    public String info(){
        return memberService.profile(SecurityContextHolder.getContext().getAuthentication().getName()).getEmail();
    }
    @GetMapping("/profile")
    public Member profile(){
        return memberService.profile(SecurityContextHolder.getContext().getAuthentication().getName());
    }
    @PostMapping("/other_profile")
    public Member otherProfile(@RequestBody MemberDto memberDto){
        return memberService.profile(memberDto.getEmail());
    }

    @PostMapping("/point")
    public String changePoint(@RequestBody PointRequest point){
        memberService.getPoint(point.getEmail(), point.getPoint());
        return point.getPoint()+" 충전 완료됐습니다.";
    }
    @PostMapping("/follow")
    public String follow(@RequestBody FollowDto followDto){
        return  followService.FollowReq(followDto.getEmail()).getFollowingId().getName()+" 에게 팔로우 요청 성공";
    }
    @GetMapping("/follower")
    public String follower(){
        return "";
    }

}
