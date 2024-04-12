'use client';
import React, { useEffect, useState } from 'react';
import styles from './Profile.module.css';
import Image from 'next/image';
import { fetchUserProfile } from '@compoents/util/http';
import LoadingIndicator from '../UI/LoadingIndicator';
import { useRouter } from 'next/navigation';


export default function UserProfile() {
  const [userInfo, setuserInfo] = useState('');
  const [followingList, setFollowingList] = useState([]);
  const [followerList, setFollowerList] = useState([]);
  const [isFollowingModalOpen, setIsFollowingModalOpen] = useState(false);
  const [isFollowerModalOpen, setIsFollowerModalOpen] = useState(false);
  const [List, setList] = useState();

  const router = useRouter();
  
  const defaultImage = "/kakaoImg.jpg";
  
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
              <button className={styles.closeButton} onClick={closeFollowingModal}>닫기</button>
            </div>
          )}
          <p className={styles.profileName}>{userInfo.name}</p>
          <p className={styles.profileEmail}>{userInfo.email}</p>
          </div>
          <button className={styles.followButton2} onClick={openFollowerModal}>팔로워 {userInfo.follower}</button>
          {isFollowerModalOpen && (
            <div className={styles.modal}>
              {/* 팔로워 리스트 표시 */}
              <button className={styles.closeButton} onClick={closeFollowerModal}>닫기</button>
            </div>
          )}
          <button className={styles.EditBtn} onClick={handleEditProfileClick} >프로필 수정</button>
        </div>
      </div>
      
      
      <button className={styles.Button1}>판매 물품</button>
      <button className={styles.Button2}>좋아요 목록</button>
      
      <div className={styles.verticalLine}></div>
      </>
    ) : (
      <div className={styles.Loading}><LoadingIndicator /></div>
    )}
  </div>
  );
};
