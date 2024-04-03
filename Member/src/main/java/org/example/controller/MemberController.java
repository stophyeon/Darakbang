package org.example.controller;




import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.example.dto.MemberDto;
import org.example.dto.ResponseCustom;
import org.example.entity.Member;
import org.example.jwt.JwtDto;

import org.example.service.MemberService;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@Tag(name = "회원", description = "회원 API")
@RequestMapping("/member")
public class MemberController {
    private final MemberService memberService;



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

    @PostMapping("/profile")
    @Operation(
            operationId = "other's profile",
            summary = "다른 사용자의 프로필"
    )
    public Member Profile(@RequestParam(value = "nick_name",required = false) @Parameter(name = "닉네임 입력") String nickName){
        return memberService.profile(nickName);
    }


    @GetMapping("/nick_name")
    public String getNickName(@RequestParam("email") String email){
        return memberService.getNickName(email);
    }
}
