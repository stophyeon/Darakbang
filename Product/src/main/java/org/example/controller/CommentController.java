package org.example.controller;

import org.example.dto.CommentResponse;
import org.example.dto.CommentSaveRequest;
import org.example.dto.CommentUpdateRequest;
import org.example.entity.Comment;
import org.example.service.CommentService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@Tag(name ="댓글" , description = "댓글 관련 API")
public class CommentController {

    private final CommentService commentService;

    //    // 댓글 작성
    @Operation(summary = "댓글 작성")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "댓글 작성 성공"),
            @ApiResponse(responseCode = "400", description = "댓글 작성 중 문제 발생")
    })
    @CrossOrigin
    @PostMapping("/comment")
    public ResponseEntity saveComment(@RequestBody CommentSaveRequest commentSaveRequest)
    {
        return commentService.addComment(commentSaveRequest) ;
    }

//    // 댓글 삭제

    @Operation(summary = "댓글 삭제")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "댓글 삭제 성공"),
            @ApiResponse(responseCode = "400", description = "댓글 삭제 중 문제 발생")
    })
    @CrossOrigin
    @DeleteMapping("/comment/{commentid}")
    public ResponseEntity deleteComment(@PathVariable("commentid") Long commentid)
    {
        return commentService.deleteComment(commentid);
    }

    //상품에 달린 댓글들가져오기
    @Operation(summary = "상품id에 따른 모든 댓글 조회")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "댓글 조회 성공"),
            @ApiResponse(responseCode = "400", description = "댓글 조회 중 문제 발생")
    })
    @CrossOrigin
    @GetMapping("/comments/product/{productid}")
    public ResponseEntity<List<CommentResponse>> getAllComment(@PathVariable("productid") Long productid)
    {
        return commentService.findCommentsByProductid(productid) ;
    }

    //댓글 1개 가져오기
    @Operation(summary = "댓글 조회")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "댓글 조회 성공"),
            @ApiResponse(responseCode = "400", description = "댓글 조회 중 문제 발생")
    })
    @CrossOrigin
    @GetMapping("/comment/{commentid}")
    public ResponseEntity<CommentResponse> getComment(@PathVariable("commentid") Long commentid)
    {
        return commentService.findComment(commentid) ;
    }
//
    // 댓글 수정
    @Operation(summary = "댓글 수정")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "댓글 수정 성공"),
        @ApiResponse(responseCode = "400", description = "댓글 수정 중 문제 발생")
    })
    @CrossOrigin
    @PutMapping("/comment/{commentid}")
    public ResponseEntity updateComment(@PathVariable("commentid") Long commentid,
                                        @RequestBody CommentUpdateRequest commentUpdateRequest)
    {
        return commentService.updateComment(commentid, commentUpdateRequest) ;
    }
}
