'use client';

import DeletePostButton from '@compoents/components/posts/Delete-button';
import { getPostData } from '@compoents/util/post-util';
import styles from './page.module.css'
import Image from 'next/image';

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
          <div className={styles.productCtr}>
            {<Image src={'/kakaoImg.jpg'} alt='상품 이미지' width={600} height={600} className={styles.productImg} />} {/*post.imageProduct ||*/}
          </div>
          <div className={styles.profiles}>
            {<Image src={'/kakaoImg.jpg'} alt='상품 이미지' width={78} height={78} className={styles.ProImg} />}
            <p className={styles.nickNames}>{post.nickName}</p>
          </div>
          <div className={styles.verticalLine}></div>
          <div className={styles.prdName}>{post.productName}</div>
          <div className={styles.price}>{post.price}원</div>
          <div className={styles.buttons}>
            <button className={styles.like}>좋아요 ♡</button>
            <button className={styles.buy}>구매하기</button>
          </div>
          <div className={styles.anotherLine}></div>
          <div>
            <p  className={styles.recomePrd}>추천 상품</p>
            <ul className={styles.postsGrid}>
              {postList && postList.productList.map((posts) => (
                <div className={styles.postItem}>
                  <div><Image src={'/kakaoImg.jpg'} alt="상품" width={350} height={350} className={styles.ListImgs}/></div>
                  <div className={styles.ListprdName}>{posts.productName}</div>
                  <div className={styles.ListPrice}>{posts.price}원</div>
                </div>
              ))}
            </ul>
          </div>
        </form>
      )}
    </>

  );
}
