package org.example.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import org.example.entity.Member;
import org.example.entity.QMember;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
@Repository
public class MemberRepositoryImpl implements MemberQueryRepository{
    private final JPAQueryFactory query;

    public MemberRepositoryImpl(JPAQueryFactory query) {
        this.query = query;
    }

    @Override
    public List<Member> findFollower(Long user_id) {
        return null;

    }

    @Override
    public List<Member> findFollowing(Long user_id) {
        return null;
    }

    @Override
    @Transactional
    public void changepoint(Member members,int point) {
        QMember member = QMember.member;
        int res =members.getPoint()+point;
         query.update(member)
                .set(member.point,res)
                .where(member.email.eq(members.getEmail())).execute();


    }
}
