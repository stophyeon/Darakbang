package org.example.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Builder;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Entity
@Getter

public class Follow {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long followId;
    private final Long followerId;
    private final Long followingId;

    @Builder
    public Follow(Long followerId,Long followingId){
        this.followerId=followerId;
        this.followingId=followingId;
    }
}
