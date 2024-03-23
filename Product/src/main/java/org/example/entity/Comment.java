package org.example.entity;

import org.example.dto.CommentResponse;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Table(name = "comment")
@Entity
@Getter
@Setter
@RequiredArgsConstructor
public class Comment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "comment_id")
    private Long commentId;

    @Column(name = "user_email")
    private String useremail;

    @Column(name = "comment_detail")
    private String commentdetail;


    @ManyToOne
    @JoinColumn(name = "product_id", referencedColumnName = "product_id")
    private Product product;

    public Comment(String user_email, String comment_detail, Product product) {
        this.useremail = user_email;
        this.commentdetail = comment_detail;
        this.product = product;
    }

    public CommentResponse toCommentResponseDto()
    {
        return CommentResponse.builder()
                .comment_id(commentId)
                .user_email(useremail)
                .comment_detail(commentdetail)
                .product_id(product.getProductId())
                .build() ;
    }
}
