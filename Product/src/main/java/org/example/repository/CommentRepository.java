package org.example.repository;

import org.example.entity.Comment;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Long> {
    Comment findByCommentId(Long commentid);

    List<Comment> findByProduct_ProductId(Long productid);

    @Transactional
    @Modifying
    @Query("update Comment c set c.commentdetail = :commentdetail where c.commentId = :commentid")
    void updateComment(
            @Param("commentid") Long commentid,
            @Param("commentdetail") String commentdetail);

}
