package org.example.repository.member;

import com.querydsl.jpa.impl.JPAQueryFactory;
import org.example.entity.Member;
import org.example.entity.QMember;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
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
    public Long findId(String email) {
        QMember member = QMember.member;
        return query.select(member.member_id)
                .from(member)
                .where(member.email.eq(email)).fetchOne();
    }

}
