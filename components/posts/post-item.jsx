'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

import styles from './post-item.module.css';
import { LikeProduct, DeleteLike } from '@compoents/util/post-util';
import Payments from "@compoents/components/payment/payments";

export default function PostItem(props) {
  const router = useRouter();
  const { product_name, price, product_id, nick_name, image_product, userProfile, state } = props.post;
  const { pageNumber } = props.posts.pageable;
  const accessToken = props.accessToken;

  const [liked, setLiked] = useState(false);
 
  const linkPath = `/${pageNumber}/${product_id}`;
  const linkProfile = `/profile/${nick_name}`;



  const handleLikeClick = async () => {
    if (!accessToken || accessToken == '') {
      router.push("/user/login");
    }
    if (liked === 'true') {
    try {
      const response = await LikeProduct(accessToken, product_id);
      setLiked(true);
      if (response && response.status === 200) {
        console.log(response.message);
      }
    } catch (error) {
      console.error('좋아요 요청을 보내는 중 오류가 발생했습니다.', error);
    }
  } else {
    try {
      const response = await DeleteLike(accessToken, product_id);
      setLiked(false);
      if (response && response.status === 200) {
        console.log(response.message);
      }
    } catch (error) {
      console.error('좋아요 삭제 요청을 보내는 중 오류가 발생했습니다.', error);
    }
  }

  };

  if (state !== 1) {
    return null;
  }

  return (
    <div className={styles.postItem}>
      <Link href={linkProfile} style={{ textDecoration: "none" }} className={styles.profile}>
        <Image src={userProfile} alt="프로필 이미지" width={49} height={49} className={styles.profileImage} priority />
        <h2 className={styles.nickName}>{nick_name}</h2>
      </Link>

      <Link href={linkPath} style={{ textDecoration: "none" }} className={styles.PostLinks}>
        <h3>{product_name}</h3>
        <Image src={image_product} width={240} height={260} alt="상품 이미지" className={styles.productImg} priority/>
        <h1>가격</h1>
        <h4>{price}원</h4>
      </Link>
      <div className={styles.buttons}>
        <button className={`${styles.like} ${liked ? styles.liked : ''}`} onClick={handleLikeClick}>
          좋아요 ♡
        </button>
        <Payments
            accessToken={accessToken}
            productId={product_id}
            post={props.post}
          />
      </div>
    </div>
  );
}

