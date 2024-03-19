'use client';
import { PostComments } from '@compoents/util/post-util';
import { useState } from 'react';

export default function CommentForm({ productId }) {
  const [comment, setComment] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const commentDetail = e.target.elements.commentdetail.value;
    const jwt = localStorage.getItem("Authorization");
    
    try {
      await PostComments(jwt, productId, commentDetail);
      setComment('');
      window.location.reload();
    } catch (error) {
      console.error('댓글 작성에 실패했습니다:', error);
      alert('댓글 작성에 실패했습니다.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="commentdetail"
        placeholder="댓글을 입력하세요"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <button type="submit">댓글 작성</button>

    </form>
  );
}
