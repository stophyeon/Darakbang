package org.example.repository.follow;

import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.example.entity.Member;
import org.example.entity.QFollow;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@RequiredArgsConstructor
public class FollowRepositoryImpl implements FollowRepositoryCustom {
    private final JPAQueryFactory query;

    @Override
    public List<Member> findFollower(Member member) {
        QFollow follow = QFollow.follow;
        return query.select(follow.followerId)
                .from(follow)
                .where(follow.followingId.eq(member)).fetch();
    }

    @Override
    public List<Member> findFollowing(Member member) {
        QFollow follow = QFollow.follow;
        return query.select(follow.followingId)
                .from(follow)
                .where(follow.followerId.eq(member)).fetch();
    }
}
