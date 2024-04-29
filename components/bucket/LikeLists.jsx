import React from "react";
import Image from "next/image";
import styles from "./LikeLists.module.css";
import { LikeList } from "@compoents/util/post-util";

import { useState, useEffect } from "react";

export default function LikeListComponent() {
    const [userLikes, setUserLikes] = useState([]);

    useEffect(() => {
        const accessToken = localStorage.getItem('Authorization');
        const fetchUserLikeProducts = async () => {
            try {
                if (!accessToken) {
                    throw new Error('로그인이 필요합니다.');
                }
                const data = await LikeList(accessToken);
                setUserLikes(data.likeProducts);
                console.log(data);
            } catch (error) {
                console.error('사용자의 좋아하는 상품을 가져오는 중 오류가 발생했습니다.', error);
            }
        };

        fetchUserLikeProducts();
    }, []);

  return (
    <>
      <section className={styles.section1}>
      </section>
      <section className={styles.section2}>
        <ul className={styles.postsGrid}>
          {userLikes.map((like) => (
            <div key={like.productId} className={styles.postItem}>
              <div className={styles.profile}>
              <Image src={like.userProfile} alt="프로필 이미지" width={49} height={49} className={styles.profileImage} priority />
              <h2 className={styles.nickName}>{like.nickName}</h2>
              </div>
              <div className={styles.flexes}>
              <h3>{like.productName}</h3>
                <Image src={like.imageProduct} alt="상품 사진" width={240} height={260} className={styles.productImg} />
                <h1>가격</h1>
                <h4>{like.price}원</h4>
                <div className={styles.buttons}>
                <button className={styles.like}>좋아요 ♡</button> 
                <button className={styles.buy}>구매하기</button>
                </div>
              </div>
            </div>
          ))}
        </ul>
      </section>
    </>
  );
};