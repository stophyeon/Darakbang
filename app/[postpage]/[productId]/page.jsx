'use client';

import DeletePostButton from '@compoents/components/posts/Delete-button';
import { getPostData } from '@compoents/util/post-util';
import styles from './page.module.css'

import { useState, useEffect } from 'react';
import PutDetailbutton from '@compoents/components/posts/Edit-button';


export default function PostDetailPage({ params }) {
  const [accessToken, setAccessToken] = useState('');
  const [post, setPosts] = useState('');
  const [postList, setPostList] = useState('');

  useEffect(() => {
    const accessTokenFromLocalStorage = localStorage.getItem('accessToken');
    if (accessTokenFromLocalStorage) {
      setAccessToken(accessTokenFromLocalStorage);
    }

    const fetchPosts = async () => {
      const postdata = await getPostData(params.productId, accessToken);
      if (postdata) {
        console.log(postdata);
        setPosts(postdata.product);
        setPostList(postdata)
        console.log(setPostList);
      }
      else {
        alert('게시물안받아옴')
      }
    }
    fetchPosts()
  }, [accessToken]);

  return (
    <>

      <DeletePostButton postpage={params.postpage} productId={params.productId} />
      <PutDetailbutton postpage={params.postpage} productId={params.productId} accessToken={accessToken} />
      {post && (
        <form className={styles.postForm}>


          <>
            <div>상품명: {post.productName}</div>
            <div>가격: {post.price}</div>
            <div>작성자: {post.nickName}</div>
            <div>상품 이미지: {post.imageProduct}</div>
            <div>추천상품들</div>
          </>
          {postList && postList.productList.map((posts) => (
            <>
              <div>{posts.productName}</div>
              <div>{posts.price}</div>
            </>
          ))}
        </form>
      )}
    </>

  );
}
