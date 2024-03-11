package org.example.repository.member;

import org.example.entity.Member;
import org.springframework.stereotype.Repository;

@Repository
public interface MemberRepositoryCustom {

    void changePoint(Member members,int point);
    void updateInfo(Member member);
    Long findId(String email);
}
