package org.example.controller;

import org.example.dto.MemberDto;
import org.example.dto.ResponseCustom;
import org.example.service.MemberService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/member")
public class MemberController {
    private final MemberService memberService;

    public MemberController(MemberService memberService) {
        this.memberService = memberService;
    }

    @PostMapping("/signup")
    public ResponseEntity<ResponseCustom> signup(@RequestBody MemberDto memberDto){
        return ResponseEntity.ok(memberService.join(memberDto));
    }
    @PostMapping("/follow")
    public String follow(@RequestBody MemberDto memberDto){

        return "로그인";
    }
}
