package org.example.service.member;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Component
//@FeignClient(name = "member",url = "http://localhost:8080/member")
@FeignClient(name = "member",url = "http://darakbang-member-service-1:8080/member")
public interface MemberFeign {
    @GetMapping("/nick_name")
    public String getNickName(@RequestParam("email") String email);
    @GetMapping("/email")
    public String getEmail(@RequestParam("nick_name") String nickName);
    @GetMapping("/user_info")
    public String getProfile(@RequestParam("email") String email);
}
