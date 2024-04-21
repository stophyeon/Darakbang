'use client';
import React, { useEffect, useState } from 'react';
import styles from './Profile.module.css';
import Image from 'next/image';
import { fetchUserProfile, fetchFollowUser, fetchFollowingUser } from '@compoents/util/http';
import LoadingIndicator from '../UI/LoadingIndicator';
import { useRouter } from 'next/navigation';
import LikeListComponent from '../bucket/LikeLists';


export default function UserProfile() {
  const [userInfo, setuserInfo] = useState('');
  const [followingList, setFollowingList] = useState([]);
  const [followerList, setFollowerList] = useState([]);
  const [isFollowingModalOpen, setIsFollowingModalOpen] = useState(false);
  const [isFollowerModalOpen, setIsFollowerModalOpen] = useState(false);
  const [currentView, setCurrentView] = useState('products');
  const router = useRouter();

  const defaultImage = "/images/kakaoImg.jpg";

  useEffect(() => {
    // API 호출 -> 사용자 정보 받아오기
    async function fetchUserProfileData() {
      try {
        const accesstoken = localStorage.getItem('Authorization');
        const data = await fetchUserProfile(accesstoken);
        setuserInfo(data);
      } catch (error) {
        console.error('사용자 프로필 정보를 가져오는 중 오류가 발생했습니다.', error);
      }
    };
    fetchUserProfileData();
  }, []);

  useEffect(() => {
    // 모달이 열릴 때 팔로워 리스트 가져오기
    async function fetchFollowerData() {
      try {
        const accessToken = localStorage.getItem('Authorization');
        const data = await fetchFollowUser(accessToken);
        setFollowerList(data);
      } catch (error) {
        console.error('팔로워 리스트를 가져오는 중 오류가 발생했습니다.', error);
      }
    }
    if (isFollowerModalOpen) {
      fetchFollowerData();
    }
  }, [isFollowerModalOpen]);

  useEffect(() => {
    async function fetchFollowingData() {
      try {
        const accessToken = localStorage.getItem('Authorization');
        const data = await fetchFollowingUser(accessToken);
        setFollowingList(data);
        console.log(data);
      } catch (error) {
        console.error('팔로잉 리스트를 가져오는 중 오류가 발생했습니다.', error);
      }
    }

    if (isFollowingModalOpen) {
      fetchFollowingData();
    }
  }, [isFollowingModalOpen]);

  const openFollowingModal = () => {
    setIsFollowingModalOpen(true);

  };

  const closeFollowingModal = () => {
    setIsFollowingModalOpen(false);
  };

  const openFollowerModal = () => {
    setIsFollowerModalOpen(true);

  };

  const closeFollowerModal = () => {
    setIsFollowerModalOpen(false);
  };

  function handleEditProfileClick() {
    router.push('/myedit');
  }
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
            <div>
              <Image //img , `file://C:/Profile_img/${userInfo.image}}`
                src={userInfo.image || defaultImage}
                alt="이미지"
                width={200}
                height={200}
                className={styles.profileImg}
                priority
              />
            </div>
            <div className={styles.userInfo}>
              <div className={styles.profileNickName}>
                {userInfo.nick_name}
              </div>

            </div>
            <div className={styles.Followes}>
              <div>
                <button className={styles.followButton} onClick={openFollowingModal}>팔로잉 {userInfo.following}</button>
                {isFollowingModalOpen && (
                  <div className={styles.modal}>
                    <ul>
                      {followingList.map((following) => (
                        <li key={following.member_id}>{following.name}</li>
                      ))}
                    </ul>
                    <button className={styles.closeButton} onClick={closeFollowingModal}>닫기</button>
                  </div>
                )}
                <p className={styles.profileName}>{userInfo.name}</p>
                <p className={styles.profileEmail}>{userInfo.email}</p>
                <p className={styles.profilePoint}>보유 포인트: {userInfo.point}원</p>
              </div>
              <button className={styles.followButton2} onClick={openFollowerModal}>팔로워 {userInfo.follower}</button>
              {isFollowerModalOpen && (
                <div className={styles.modal}>
                  <ul>
                    {followerList.map((follower) => (
                      <li key={follower.member_id}>{follower.name}</li>
                    ))}
                  </ul>
                  <button className={styles.closeButton} onClick={closeFollowerModal}>닫기</button>
                </div>
              )}
              <button className={styles.EditBtn} onClick={handleEditProfileClick} >프로필 수정</button>
            </div>
          </div>


          <button onClick={showProducts} className={styles.Button1}>판매 물품</button>
          <button onClick={showLikes} className={styles.Button2}>좋아요 목록</button>
          <div  className={styles.verticalLine}></div>
          {/* {currentView === 'products' && <ProductsComponent />}
          {currentView === 'likes' && <LikeListComponent />} 수정 중 */} 
        </>
      ) : (
        <div className={styles.Loading}><LoadingIndicator /></div>
      )}
    </div>
  );
};
