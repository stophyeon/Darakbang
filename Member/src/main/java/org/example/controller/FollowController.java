package org.example.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.example.dto.follow.FollowDto;
import org.example.entity.Member;
import org.example.service.FollowService;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/follow")
@Tag(name = "팔로우", description = "팔로우 관련 api")
public class FollowController {
    private final FollowService followService;
    @PostMapping("/{email}")
    @Operation(
            operationId = "follow request",
            summary = "팔로우 요청"
    )
    public String follow(@PathVariable("email") String email ,@RequestBody FollowDto followDto){
        return  followService.FollowReq(followDto.getEmail(),email).getFollowingId().getName()+" 에게 팔로우 요청 성공";
    }
    @GetMapping("/follower/{email}")
    @Operation(
            operationId = "follower view",
            summary = "팔로워 사용자 조회"
    )
    public List<Member> follower(@PathVariable("email") String email){
        return followService.getFollower(email);
    }
    @GetMapping("/following/{email}")
    @Operation(
            operationId = "following view",
            summary = "팔로윙한 사용자 조회"
    )
    public List<Member> following(@PathVariable("email") String email){
        return followService.getFollowing(email);
    }

}
