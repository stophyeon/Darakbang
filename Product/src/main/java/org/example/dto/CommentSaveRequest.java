package org.example.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@AllArgsConstructor
public class CommentSaveRequest {


    public CommentSaveRequest(){
    }


    private String comment_detail;

    private Long product_id ;

    private String jwt;

}
