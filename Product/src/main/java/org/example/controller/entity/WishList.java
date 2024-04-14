package org.example.controller.entity;

import jakarta.persistence.*;
import lombok.*;


@Entity
@Getter
@RequiredArgsConstructor
public class WishList {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "wishlist_id")
    private Long wishListId;

    @Column(name = "product_id")
    private Long productId;

    @Column(name = "email")
    private String email;

    @Builder
    public WishList(String email, Long productId){
        this.email=email;
        this.productId=productId;
    }
}
