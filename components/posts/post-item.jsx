'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';

import styles from './post-item.module.css';
import { LikeProduct } from '@compoents/util/post-util';

function PostItem(props) {
  const [profile, setProfile] = useState('');
  const { product_name, price, product_id, nick_name, image_product } = props.post;
  const { pageNumber } = props.posts.pageable;

 
  const linkPath = `/${pageNumber}/${product_id}`;

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const accessToken = localStorage.getItem('Authorization');
        const data = await fetchOtherUserProfile(nick_name, accessToken);
        setProfile(data);
      } catch (error) {
        console.error('프로필 정보를 가져오는 중 오류가 발생했습니다.', error);
      }
      fetchProfile();
    };
  }, [nick_name]);


  const handleLikeClick = async () => {
    try {
        const accessToken = localStorage.getItem('Authorization');
        const response = await LikeProduct(accessToken, product_id);
        if (response && response.status === 200) {
          alert(response.message);
      }
  } catch (error) {
      console.error('좋아요 요청을 보내는 중 오류가 발생했습니다.', error);
  }
};

  return (
    <>
      
        <div className={styles.postItem}>
        <Link href={linkPath} style={{ textDecoration: "none" }} className={styles.PostLinks}>
          <div className={styles.profile}>
          <Image src={profile.image || '/kakaoImg.jpg'} alt="프로필 이미지" width={49} height={49} className={styles.profileImage} />
          <h2 className={styles.nickName}>{nick_name}</h2>
          </div>
          <h3>{product_name}</h3>
          <Image src={image_product || '/kakaoImg.jpg'} width={210} height={230} alt="상품 이미지"className={styles.productImg}/>
          <h1>가격</h1>
          <h4>{price}원</h4>
          </Link>
          <div className={styles.buttons}>
        <button className={styles.like} onClick={handleLikeClick}>좋아요 ♡</button> 
        <button className={styles.buy}>구매하기</button>
        </div>
        </div>
      
      
    </>
  );
}

export default PostItem;