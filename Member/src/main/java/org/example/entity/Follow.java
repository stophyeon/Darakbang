package org.example.entity;

import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Entity
@Getter
@RequiredArgsConstructor
public class Follow {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long followId;

    @ManyToOne
    @JoinColumn(name = "follower_id")
    private Member followerId;

    @ManyToOne
    @JoinColumn(name = "following_id")
    private Member followingId;

    @Builder
    public Follow(Member followerId,Member followingId){
        this.followerId=followerId;
        this.followingId=followingId;
    }
}
