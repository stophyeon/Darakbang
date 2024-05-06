'use client';
import DeletePostButton from '@compoents/components/posts/Interaction/Delete-button';
import styles from './ProductDetailContainers.module.css';
import Image from 'next/image';
import Link from 'next/link';
import Payment from "@compoents/components/payment/payment";
import { useState } from 'react';
import { LikeProduct } from '@compoents/util/post-util';

import PutDetailbutton from '@compoents/components/posts/Interaction/Edit-button';


export default function PostDetailContainers({ productId, postpage, post, postList, accessToken }) {
  const [liked, setLiked] = useState(false);
  const handleLikeClick = async () => {
    try {
      const response = await LikeProduct(accessToken, productId);
      setLiked(true);
      if (response && response.status === 200) {
        console.log(response.message);
      }
    } catch (error) {
      console.error('좋아요 요청을 보내는 중 오류가 발생했습니다.', error);
    }
  };

  const linkProfile = `/profile/${post.nickName}`;

  return (
    <>
    {postList.me && (
      <>
        <DeletePostButton postpage={postpage} productId={productId} />
        <PutDetailbutton postpage={postpage} productId={productId} accessToken={accessToken} />
      </>
    )}
      <div className={styles.postForm}>
        <div className={styles.productCtr}>
          <Image src={post.imageProduct} alt='상품 이미지' width={600} height={600} className={styles.productImg} />
        </div>
        <Link href={linkProfile} className={styles.profiles}>
          <Image src={post.userProfile} alt='프로필 이미지' width={78} height={78} className={styles.ProImg} />
          <p className={styles.nickNames}>{post.nickName}</p>
        </Link>
        <div className={styles.verticalLine}></div>
        <div className={styles.prdName}>{post.productName}</div>
        <div className={styles.price}>{post.price}원</div>
        <div className={styles.buttons}>
        <button className={`${styles.like} ${liked ? styles.liked : ''}`} onClick={handleLikeClick}>
          좋아요 ♡
        </button>
          <Payment
            accessToken={accessToken}
            productId={productId}
            post={post}
          />
        </div>
        {postList.productList && postList.productList.length > 0 && (
          <>
            <div className={styles.anotherLine}></div>
            <div>
              <p className={styles.recomePrd}>추천 상품</p>
              <ul className={styles.postsGrid}>
                {postList && postList.productList.map((posts) => (
                  <div key={posts.productId} className={styles.postItem}>
                    <Link href={`/${postpage}/${productId}`} style={{ textDecoration: "none" }}>
                      <div><Image src={posts.imageProduct || '/defaultImg.jpg'} alt="상품" width={350} height={350} className={styles.ListImgs} /></div>
                      <div className={styles.ListprdName}>{posts.productName}</div>
                      <div className={styles.ListPrice}>{posts.price}원</div>
                    </Link>
                  </div>
                ))}
              </ul>
            </div>
          </>
        )}
      </div>
    </>
  );
}