'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';

import styles from './post-item.module.css';

function PostItem(props) {
  const [profile, setProfile] = useState('');
  const { product_name, price, product_id, nick_name, image_product } = props.post;
  const { pageNumber } = props.posts.pageable;
  const accessToken = props.accessToken;

 
  const linkPath = `/${pageNumber}/${product_id}`;

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await fetchOtherUserProfile(nick_name, accessToken);
        setProfile(data);
      } catch (error) {
        console.error('프로필 정보를 가져오는 중 오류가 발생했습니다.', error);
      }
      fetchProfile();
    };
  }, [nick_name]);

  return (
      <Link href={linkPath} style={{ textDecoration: "none" }} className={styles.PostLinks}>
        <div className={styles.postItem}>
          <div className={styles.profile}>
          <Image src={profile.image || '/kakaoImg.jpg'} alt="프로필 이미지" width={49} height={49} className={styles.profileImage} />
          <h2 className={styles.nickName}>{nick_name}</h2>
          </div>
          <h3>{product_name}</h3>
          <Image src={image_product || '/kakaoImg.jpg'} width={210} height={230} alt="상품 이미지"className={styles.productImg}/>
          <h1>가격</h1>
          <h4>{price}원</h4>
          <div className={styles.buttons}>
            <button className={styles.like}>좋아요 ♡</button> 
            <button className={styles.buy}>구매하기</button>
          </div>
        </div>
      </Link>
  );
}

export default PostItem;