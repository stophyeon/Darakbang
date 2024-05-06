'use client';
import Image from "next/image";
import { useState } from 'react';
import LoadingIndicator from "../UI/LoadingIndicator";
import styles from './OtherProfileform.module.css'
import ProductsComponent from "./ProductsComponent";
import LikeListComponent from "../bucket/LikeLists";
import { followUser } from "@compoents/util/http";
import { RefreshAccessToken } from "@compoents/util/http";

import { Popover, PopoverTrigger, PopoverContent, Button } from "@nextui-org/react";

export default function OtherProfileform({ userInfo, nick_name, accessToken, followerList, followingList, userproducts }) {
  const [currentView, setCurrentView] = useState('products');

  const handleFollow = async () => {
    try {
      const response = await followUser(accessToken, userInfo.email);
      console.log('팔로우 요청이 성공했습니다.');
    } catch (error) {
      console.error('팔로우 요청 중 오류가 발생했습니다.', error);
    }
  };

  const showProducts = () => {
    setCurrentView('products');
  };
  
  const showLikes = () => {
    setCurrentView('likes');
  };
  


  return (
    <div className={styles.profileContainer}>
      {userInfo ? (
        <>
        <div className={styles.profileInfo}>
          <div >
            <Image 
              src={userInfo.image || '/defaultImg.jpg'}  
              alt="이미지"
              width={200}
              height={200}
              className={styles.profileImg}
            />
          </div>
          <div className={styles.userInfo}>
              <div className={styles.profileNickName}>
                {userInfo.nick_name}
              </div>
            </div>
          <div className={styles.Followes}>
          <div>
          <Popover showArrow={true} placement="bottom">
          <PopoverTrigger className={styles.followButton}>
          <Button className={styles.Followingbtn}>팔로잉 {userInfo.following}</Button>
          </PopoverTrigger>
              <PopoverContent className={styles.modal}>
              <ul>
                      {followingList.map((following) => (
                        <li key={following.member_id}>
                            <div className={styles.flex}>
                              <Image src={following.image} alt="프로필 사진" width={15} height={15} priority className={styles.followImg}/>
                              <p className={styles.names}>{following.name}</p>
                            </div>
                        </li>
                      ))}
                    </ul>
                  </PopoverContent> 
                </Popover>
            <p className={styles.profileName}>{userInfo.name}</p>
            <p className={styles.profileEmail}>{userInfo.email}</p>
            </div>
            <Popover showArrow={true} placement="bottom">
              <PopoverTrigger className={styles.followButton2}>
              <Button className={styles.Followingbtn}>
                팔로워 {userInfo.follower}
                </Button>
              </PopoverTrigger>
                <PopoverContent className={styles.modal}>
                  <ul>
                    {followerList.map((follower) => (
                      <li key={follower.member_id}>
                        <div className={styles.flex}>
                              <Image src={follower.image} alt="프로필 사진" width={15} height={15} priority className={styles.followImg} />
                              <p className={styles.names}>{follower.name}</p>
                        </div>
                        </li>
                    ))}
                  </ul>
                </PopoverContent>
              </Popover>
            <button onClick={handleFollow} className={styles.profileBtn} >
              팔로우
            </button>
          </div>
        </div>
        <button onClick={showProducts} className={styles.Button1}>판매 물품</button>
        <button onClick={showLikes} className={styles.Button2}>좋아요 목록</button>
        <div className={styles.verticalLine}></div>
        <div className={styles.Lists}>
          {currentView === 'products' && <ProductsComponent userproducts={userproducts} />} 
          {currentView === 'likes' && <LikeListComponent />} 
          </div>
        
        </>
      ) : (
        <div className={styles.Loading}><LoadingIndicator /></div>
      )}
    </div>
  );
};
