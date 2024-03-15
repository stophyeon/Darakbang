package org.example.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.example.dto.FollowDto;
import org.example.entity.Member;
import org.example.service.FollowService;
import org.example.service.MemberService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/follow")
@Tag(name = "팔로우", description = "팔로우 관련 api")
public class FollowController {
    private final MemberService memberService;
    private final FollowService followService;
    @PostMapping("")
    @Operation(
            operationId = "follow request",
            summary = "팔로우 요청"
    )
    public String follow(@RequestBody FollowDto followDto){
        return  followService.FollowReq(followDto.getEmail()).getFollowingId().getName()+" 에게 팔로우 요청 성공";
    }
    @GetMapping("/follower")
    @Operation(
            operationId = "follower view",
            summary = "팔로워 사용자 조회"
    )
    public List<Member> follower(@RequestParam("nick_name") @Parameter(name = "닉네임 입력")String nickName){
        return followService.getFollower(nickName);
    }
    @GetMapping("/following")
    @Operation(
            operationId = "following view",
            summary = "팔로윙한 사용자 조회"
    )
    public List<Member> following(@RequestParam("nick_name") @Parameter(name = "닉네임 입력")String nickName){
        return followService.getFollowing(nickName);
    }

}
