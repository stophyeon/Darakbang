package org.example.repository.follow;

import org.example.entity.Follow;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FollowRepository extends JpaRepository<Follow,Long>, FollowRepositoryCustom {
    Long findByFollowingId(Long followingId);
}
