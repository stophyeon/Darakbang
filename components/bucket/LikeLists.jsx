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
        <h1 className={styles.bktitle}>좋아요 목록</h1>
      </section>
      <section className={styles.section2}>
        <ul className={styles.postsGrid}>
          {userLikes.map((like) => (
            <div key={like.productId} className={styles.postItem}>
              <div className={styles.flexes}>
                <Image src={like.imageProduct} alt="상품 사진" width={150} height={150} className={styles.IpImg} />
                <div className={styles.PrdName}>{like.productName}</div>
                <div className={styles.position}>
                  <button className={styles.DtBtn} onClick={() => handleDeleteLike(like)}>삭제하기 <Image src={'/svgs/Close_round.svg'} width={24} height={24} alt="" className={styles.svgs} /></button>
                  <button className={styles.OdBtn}>구매하기 <Image src={'/svgs/Box_alt_fill.svg'} width={24} height={24} alt="" className={styles.svgs} /></button>
                </div>
              </div>
            </div>
          ))}
        </ul>
      </section>
    </>
  );
};
