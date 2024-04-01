'use client';
import { useState } from 'react';
import { DeletePost } from '@compoents/util/post-util';

export default function DeletePostButton({ productId, accessToken }) {
  const [isDeleting, setIsDeleting] = useState(false);

  async function deletePostDataHandler() {
    setIsDeleting(true);
    await DeletePost(productId, accessToken);
    setIsDeleting(false);
    window.location.href = '/';
  }

  return (
    <button onClick={deletePostDataHandler} disabled={isDeleting}>
      {isDeleting ? '삭제 중...' : '삭제'}
    </button>
  );
}
