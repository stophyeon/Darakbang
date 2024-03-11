package org.example.repository.follow;

import org.springframework.stereotype.Repository;

@Repository
public class FollowRepositoryImpl implements FollowRepositoryCustom {
    @Override
    public Long findFollowerNumber(Long user_id) {
        return null;
    }

    @Override
    public Long findFollowingNumber(Long user_id) {
        return null;
    }

    @Override
    public void followReq(String email) {

    }
}
