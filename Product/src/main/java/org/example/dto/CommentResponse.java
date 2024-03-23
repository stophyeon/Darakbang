package org.example.dto;

import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@Builder
public class CommentResponse {

    private Long comment_id;

    private String user_email;

    private String comment_detail;

    private Long product_id;

}
