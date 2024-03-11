package org.example.repository.follow;

import org.springframework.stereotype.Repository;

@Repository
public interface FollowRepositoryCustom {
    Long findFollowerNumber(Long user_id);
    Long findFollowingNumber(Long user_id);
    void followReq(String email);
}
