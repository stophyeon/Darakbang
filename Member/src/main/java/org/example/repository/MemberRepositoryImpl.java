package org.example.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import org.example.entity.Member;
import org.springframework.stereotype.Repository;

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
}
