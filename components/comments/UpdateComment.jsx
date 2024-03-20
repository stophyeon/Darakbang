'use client';
import { UpdateComment, DeleteComment } from "@compoents/util/post-util";
import { useState } from 'react';


export function CommentEdits({ commentId, initialComment }) {

  const [updatedComment, setUpdatedComment] = useState(initialComment);
  const [isEditing, setIsEditing] = useState(false);
  const handleEdit = async () => {
    try {
      await UpdateComment(commentId, updatedComment);
      setIsEditing(false);
    } catch (error) {
      console.error('댓글 수정에 실패했습니다:', error);
      alert('댓글 수정에 실패했습니다.');
    }
  };


  const handleDelete = async () => {
    try {
      await DeleteComment(commentId);
      window.location.reload();
    } catch (error) {
      console.error('댓글 삭제에 실패했습니다:', error);
      alert('댓글 삭제에 실패했습니다.');
    }
  };

  return (
    <div>
      {isEditing ? (
        <textarea   
          value={updatedComment}
          onChange={(e) => setUpdatedComment(e.target.value)}
        />
      ) : (
        <div>내용 : {updatedComment}</div>
      )}
      <button onClick={handleDelete}>댓글 삭제</button>
      {isEditing ? (
        <button onClick={handleEdit}>수정 완료</button>
      ) : (
        <button onClick={() => setIsEditing(true)}>댓글 수정</button>
      )}
    </div>
  );
}
