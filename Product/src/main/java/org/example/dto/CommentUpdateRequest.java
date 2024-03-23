package org.example.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class CommentUpdateRequest {

    public CommentUpdateRequest() {
    }

    private String comment_detail ;

}
