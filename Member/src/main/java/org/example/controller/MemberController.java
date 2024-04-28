package org.example.controller;




import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;


import org.example.dto.*;

import org.example.service.MemberService;
import org.example.service.PaymentsService;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;


@RestController
@RequiredArgsConstructor
@Tag(name = "회원", description = "회원 API")
@RequestMapping("/member")
public class MemberController {
    private final MemberService memberService;
    private final PaymentsService paymentsService;

    @Operation(
            operationId = "signup",
            description = "아이디,비밀번호,이름등을 입력받아 회원가입",
            summary = "회원가입"
    )
    @PostMapping(value = "/signup",consumes = {MediaType.APPLICATION_JSON_VALUE , MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity<ResponseCustom> signup(@RequestPart(name = "req") @Parameter MemberDto memberDto, @RequestPart(name = "img",required = false) @Parameter MultipartFile img) throws IOException {

        return ResponseEntity.ok(memberService.join(memberDto,img));
    }
    @PostMapping("/login")
    @Operation(
            operationId = "login",
            description = "아이디,비밀번호으로 로그인",
            summary = "로그인한 사용자의 이메일"
    )
    public ResponseEntity<LoginSuccessDto> follow(@RequestBody @Parameter MemberDto memberDto){
        LoginSuccessDto res = memberService.login(memberDto);
        return ResponseEntity.ok(res);
    }

    @GetMapping("/profile/{email}")
    @Operation(
            operationId = "other's profile",
            summary = "다른 사용자의 프로필"
    )
    public MemberDto myProfile(@PathVariable("email")String email){
        return memberService.myProfile(email);
    }
    @PostMapping("/profile/{nick_name}/{email}")
    @Operation(
            operationId = "other's profile",
            summary = "다른 사용자의 프로필"
    )
    public MemberDto Profile(@PathVariable(value = "nick_name",required = false) @Parameter(name = "닉네임 입력") String nickName, @PathVariable("email")String email){
        return memberService.profile(nickName);
    }

    @GetMapping("/nick_name")
    public String getNickName(@RequestParam("email") String email){return memberService.getNickName(email);}


    @GetMapping("/user_info")
    public String getEmail(@RequestParam("email") String email){return memberService.profileImg(email);}

    @Operation(
            operationId = "profile",
            description = "프로필 수정 요청",
            summary = "프로필 업데이트"
    )
    @PutMapping(path = "/profile/{email}",consumes = {MediaType.APPLICATION_JSON_VALUE , MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity<ResponseCustom> changeProfile(@RequestPart(name = "req",required = false) @Parameter MemberDto memberDto,
                                                        @RequestPart(name = "img",required = false) @Parameter MultipartFile img,
                                                        @PathVariable("email") String email) throws IOException {
        return ResponseEntity.ok(memberService.updateProfile(img,memberDto,email));
    }

    @Operation(
            operationId = "payments",
            description = "결제 요청",
            summary = "결제"
    )

    @PostMapping("/payments/{email}")
    public ResponseEntity<PaymentsRes> payments(@RequestBody @Parameter(name = "total_point, payments_list") PurchaseDto purchaseDto,@PathVariable("email") String email) {
        return ResponseEntity.ok(paymentsService.purchase(purchaseDto,email));
    }

    @PostMapping("/payments")
    public ResponseEntity<PaymentsRes> paymentsSuccess(@RequestBody PurchaseDto purchaseDto){
        return ResponseEntity.ok(paymentsService.purchaseSuccess(purchaseDto));
    }

    @PostMapping("/refresh")
    public ResponseEntity<RefreshDto> refreshAccessToken(@RequestBody RefreshDto refreshToken){
        return ResponseEntity.ok(memberService.refreshToken(refreshToken.getRefresh_token()));
    }

    @PostMapping("/logout/{email}")
    public void logOut(@PathVariable("email") String email){
        memberService.deleteRefresh(email);
    }
}
