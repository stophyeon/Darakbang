package org.example.repository;

import org.example.entity.Member;

import java.util.List;

public interface MemberQueryRepository {
    List<Member> findFollower(Long user_id);
    List<Member> findFollowing(Long user_id);
    void changepoint(Member members,int point);
}
