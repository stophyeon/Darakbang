package org.example.service;

import org.example.dto.CommentResponse;
import org.example.dto.CommentSaveRequest;
import org.example.dto.CommentUpdateRequest;
import org.example.dto.ProductSaveRequest;
import org.example.entity.Comment;
import org.example.entity.Product;
import org.example.repository.CommentRepository;
import org.example.repository.ProductRepository;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class CommentService {

    private final CommentRepository commentRepository;

    private final ProductRepository productRepository;

    private final GetEmailService getEmailService;

    //서비스단 메소드명 설정 필요

    public ResponseEntity addComment(CommentSaveRequest commentSaveRequest) {
        try {
            String writeuseremail = getEmailService.getEmail(commentSaveRequest.getJwt());
            Product commentsproduct = productRepository.findByProductId(commentSaveRequest.getProduct_id());
            Comment savecomment = new Comment(writeuseremail, commentSaveRequest.getComment_detail(),commentsproduct);
            commentRepository.save(savecomment);
            return ResponseEntity.ok().build();
        } catch(NullPointerException e) {
            log.info("null 반환");
            return ResponseEntity.badRequest().build();
        }
    }

    public ResponseEntity deleteComment(Long commentid)
    {
        try{
            Comment deletecomment = commentRepository.findByCommentId(commentid);
            commentRepository.delete(deletecomment);
            return ResponseEntity.ok().build() ;
        } catch(Exception e)
        {
            return ResponseEntity.badRequest().build();
        }
    }

    public ResponseEntity<List<CommentResponse>> findCommentsByProductid (Long productid)
    {
        List<CommentResponse> commentResponseList = commentRepository.findByProduct_ProductId(productid)
                .stream()
                .map(comment -> CommentResponse.builder()
                        .comment_id(comment.getCommentId())
                        .user_email(comment.getUseremail())
                        .comment_detail(comment.getCommentdetail())
                        .product_id(comment.getProduct().getProductId())
                        .build()) // 빌더를 이용하여 CommentResponse 객체 생성
                .collect(Collectors.toList()); // 스트림을 리스트로 변환
        return ResponseEntity.ok(commentResponseList);
    }

    public ResponseEntity<CommentResponse> findComment(Long commentid)
    {
        Comment comment =commentRepository.findByCommentId(commentid) ;
        CommentResponse commentResponse = comment.toCommentResponseDto() ;
        return ResponseEntity.ok(commentResponse) ;
    }

    public ResponseEntity updateComment(Long commentid, CommentUpdateRequest commentUpdateRequest)
    {
        String changecommentdetail = commentUpdateRequest.getComment_detail();

        try {
            commentRepository.updateComment(commentid,changecommentdetail);
            return ResponseEntity.ok().build();
        } catch (Exception e ){
            log.info("ohmyexception") ;
            log.info(e.getMessage()) ;
            return ResponseEntity.badRequest().build() ;

        }
    }
}
