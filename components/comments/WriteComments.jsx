'use client';

import { PostComments } from '@compoents/util/post-util';

export default function CommentForm({ productId }){
    const handleSubmit = async (e) => {
        e.preventDefault();
        const commentdetail = e.target.elements.commentdetail.value;
        const jwt = localStorage.getItem('jwt');
        
        try {
          await PostComments(jwt, productId, commentdetail);
        } catch (error) {
          console.error('댓글 작성에 실패했습니다:', error);
          alert('댓글 작성에 실패했습니다.');
        }
      };
      
      return (
        <form onSubmit={handleSubmit}>
          <input type="text" name="commentdetail" placeholder="댓글을 입력하세요" />
          <button type="submit">댓글 작성</button>
        </form>
      );
      
};
