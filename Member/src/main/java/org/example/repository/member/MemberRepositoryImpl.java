package org.example.repository.member;

import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.extern.slf4j.Slf4j;
import org.example.entity.Member;
import org.example.entity.QMember;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
@Slf4j
public class MemberRepositoryImpl implements MemberRepositoryCustom {
    private final JPAQueryFactory query;

    public MemberRepositoryImpl(JPAQueryFactory query) {
        this.query = query;
    }



    @Override
    @Transactional
    public void changePoint(Member members,int point) {
        QMember member = QMember.member;
        int res =members.getPoint()+point;
         query.update(member)
                .set(member.point,res)
                .where(member.email.eq(members.getEmail())).execute();


    }

    @Override
    @Transactional
    public void updateInfo(Member member) {
        QMember qMember = QMember.member;
        query.update(qMember)
                .set(qMember.name, member.getName())
                .set(qMember.image, member.getImage())
                .where(qMember.email.eq(member.getEmail())).execute();
    }

    @Override
    public void updateFollower(Member member) {
        int num = member.getFollower()+1;
        QMember qMember = QMember.member;
        query.update(qMember)
                .set(qMember.follower,num)
                .where(qMember.email.eq(member.getEmail())).execute();
        log.info(String.valueOf(num));
    }

    @Override
    public void updateFollowing(Member member) {
        QMember qMember = QMember.member;
        int num=member.getFollowing()+1;
        query.update(qMember)
                .set(qMember.following,num)
                .where(qMember.email.eq(member.getEmail())).execute();
        log.info(String.valueOf(num));
    }


    @Override
    public Long findId(String email) {
        QMember member = QMember.member;
        return query.select(member.member_id)
                .from(member)
                .where(member.email.eq(email)).fetchOne();
    }

}
