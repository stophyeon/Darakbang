'use server';

import DeletePostButton from '@compoents/components/posts/Delete-button';
import PutDetailPage from '@compoents/components/posts/Edit-button';
import { getPostData } from '@compoents/util/post-util';
import styles from './page.module.css'

import { cookies } from 'next/headers';


export default async function PostDetailPage({ params }) {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("Authorization");

  const postData = getPostData(params.productId, accessToken)

  const [ post ] = await Promise.all([postData]);

  return (
    <>
    <DeletePostButton productId={params.productId} accessToken={accessToken} />
    <PutDetailPage productId={params.productId} accessToken={accessToken} />
      <form className={styles.postForm}>
        
        {post && (
          <>
            <div>상품명: {post.product_name}</div>
            <div>가격: {post.price}</div>
            <div>작성자: {post.user_email}</div>
            <div>상품 이미지: {post.image_product}</div>
          </>
        )}
      </form>
    </>
  );
}
