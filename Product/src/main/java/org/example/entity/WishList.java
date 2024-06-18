package org.example.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;


@Entity
@Getter
@RequiredArgsConstructor
public class WishList {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "wishlist_id")
    private Long wishListId;

    @ManyToOne
    @JoinColumn(name = "product")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Product product;

    @Column(name = "email")
    private String email;

    @Builder
    public WishList(String email, Product product){
        this.email=email;
        this.product=product;
    }
}
