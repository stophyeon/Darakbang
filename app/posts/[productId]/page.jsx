import DeletePostButton from '@compoents/components/posts/Delete-button';
import { getPostData} from '@compoents/util/post-util';

export default async function PostDetailPage({ params }) {
  const postData = getPostData(params.productId)
  
  const [ post ] = await Promise.all([postData]);
  
  return (
    <>
    <DeletePostButton productId={params.productId}/>
      {post && (
        <div>
          <div>상품명: {post.productname}</div>
          <div>가격: {post.price}</div>
          <div>{post.pmessage}</div>
        </div>
      )}
    </>
  );
}