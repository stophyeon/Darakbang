'use client';
import { useState } from 'react';
import { DeleteComment, DeletePost } from '@compoents/util/post-util';

export default function DeletePostButton({ productId}) {
  const [isDeleting, setIsDeleting] = useState(false);

  async function deletePostDataHandler() {
    setIsDeleting(true);
    await DeletePost(productId);
    setIsDeleting(false);
    window.location.href = '/posts';
  }

  return (
    <button onClick={deletePostDataHandler} disabled={isDeleting}>
      {isDeleting ? '삭제 중...' : '삭제'}
    </button>
  );
}
