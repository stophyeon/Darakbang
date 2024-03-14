package org.example.controller;




import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.example.dto.FollowDto;
import org.example.dto.MemberDto;
import org.example.dto.PointRequest;
import org.example.dto.ResponseCustom;
import org.example.entity.Member;
import org.example.jwt.JwtDto;
import org.example.service.FollowService;
import org.example.service.MemberService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequiredArgsConstructor
@Tag(name = "회원", description = "회원 API")
@RequestMapping("/member")
public class MemberController {
    private final MemberService memberService;
    private final FollowService followService;


    @Operation(
            operationId = "signup",
            description = "아이디,비밀번호,이름등을 입력받아 회원가입",
            summary = "회원가입"
    )

    @PostMapping("/signup")
    public ResponseEntity<ResponseCustom> signup(@RequestBody @Parameter MemberDto memberDto){
        return ResponseEntity.ok(memberService.join(memberDto));
    }
    @PostMapping("/login")
    @Operation(
            operationId = "login",
            description = "아이디,비밀번호으로 로그인",
            summary = "로그인한 사용자의 이메일"
    )
    public ResponseEntity<JwtDto> follow(@RequestBody @Parameter MemberDto memberDto){
        JwtDto jwtDto = memberService.login(memberDto);
        return ResponseEntity.ok(jwtDto);
    }
    @Operation(
            operationId = "My email",
            summary = "로그인한 사용자의 이메일"

    )
    @GetMapping("/info")
    public String info(){
        return memberService.profile(SecurityContextHolder.getContext().getAuthentication().getName()).getEmail();
    }
    @Operation(
            operationId = "My profile",
            summary = "로그인한 사용자의 프로필"
    )
    @GetMapping("/profile")
    public Member profile(){
        return memberService.profile(SecurityContextHolder.getContext().getAuthentication().getName());
    }
    @PostMapping("/other")
    @Operation(
            operationId = "other's profile",
            summary = "다른 사용자의 프로필"
    )
    public Member otherProfile(@RequestParam("nick_name") @Parameter(name = "닉네임 입력") String nickName){
        return memberService.otherProfile(nickName);
    }

    @PostMapping("/point")
    @Operation(
            operationId = "point purchase",
            summary = "포인트 구매후 적용"

    )
    public String changePoint(@RequestBody PointRequest point){
        memberService.getPoint(point.getEmail(), point.getPoint());
        return point.getPoint()+" 충전 완료됐습니다.";
    }

}
