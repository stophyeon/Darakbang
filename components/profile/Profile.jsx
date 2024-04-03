'use client';
import React, { useEffect, useState } from 'react';
import styles from './Profile.module.css';
import Image from 'next/image';
import { fetchUserProfile } from '@compoents/util/http';


export default function UserProfile() {
  const [userInfo, setuserInfo] = useState('');
  const [followingList, setFollowingList] = useState([]);
  const [followerList, setFollowerList] = useState([]);
  const [isFollowingModalOpen, setIsFollowingModalOpen] = useState(false);
  const [isFollowerModalOpen, setIsFollowerModalOpen] = useState(false);
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


  return (
    <div className={styles.profileContainer}>
    {userInfo ? (
      <div className={styles.profileInfo}>
        <h2 className={styles.profileTitle}>사용자 프로필 정보</h2>
        <div className={styles.profileItem}>
          <Image
            src={userInfo.image || defaultImage}
            alt="이미지"
            width={200}
            height={300}
          />
        </div>
        <p className={styles.profileItem}>닉네임: {userInfo.nick_name}</p>
        <p className={styles.profileItem}>이름: {userInfo.name}</p>
        <p className={styles.profileItem}>이메일: {userInfo.email}</p>
        <div className={styles.followListContainer}>
          <button className={styles.followButton} onClick={openFollowingModal}>팔로잉 {userInfo.following}</button>
          {isFollowingModalOpen && (
            <div className={styles.modal}>
              <button className={styles.closeButton} onClick={closeFollowingModal}>닫기</button>
            </div>
          )}
        </div>
        <div className={styles.followListContainer}>
          <button className={styles.followButton} onClick={openFollowerModal}>팔로워 {userInfo.follower}</button>
          {isFollowerModalOpen && (
            <div className={styles.modal}>
              {/* 팔로워 리스트 표시 */}
              <button className={styles.closeButton} onClick={closeFollowerModal}>닫기</button>
            </div>
          )}
        </div>
      </div>
    ) : (
      <p className={styles.profileLoading}>사용자 프로필 정보를 불러오는 중입니다...</p>
    )}
  </div>
  );
};
