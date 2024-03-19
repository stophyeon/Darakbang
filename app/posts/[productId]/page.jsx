import DeletePostButton from '@compoents/components/posts/Delete-button';
import PutDetailPage from '@compoents/components/posts/Edit-button';
import { CommentEdits } from '@compoents/components/comments/UpdateComment';
import { revalidateTag } from 'next/cache';

import { getPostData, getComments } from '@compoents/util/post-util';


import CommentForm from '@compoents/components/comments/WriteComments';

export default async function PostDetailPage({ params }) {
  revalidateTag('collection')
  const postData = getPostData(params.productId)
  const commentsData = getComments(params.productId);

  const [ post, comments ] = await Promise.all([postData, commentsData]);   // post 옆에 comment 추가, postData옆에 commentsData 추가  
  
  return (
    <>
    <DeletePostButton productId={params.productId}/>
    <PutDetailPage productId={params.productId} />
     {post && (
        <div key={post.productId}>
          <div>상품명: {post.productname}</div>
          <div>가격: {post.price}</div>
          <div>{post.pmessage}</div>
        </div>
      )}

      {/* 댓글 */}
      {comments && (
        <div>
          <h2>댓글</h2>
          {comments.map((comment) => (
            <div key={comment.commentId}>
              <div>작성자: {comment.useremail}</div>
              {/* <div>내용: {comment.commentdetail}</div> */}
              {comment.commentId && <CommentEdits commentId={comment.commentId} initialComment={comment.commentdetail} />}
            </div>
          ))}
          <CommentForm useremail={comments.useremail} commentId={comments.commentId} productId={params.productId} />
        </div>
      )}
    </>
  );
}
