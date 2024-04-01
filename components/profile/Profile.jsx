'use client';
import React, { useEffect, useState } from 'react';
import styles from './Profile.module.css';
import Image from 'next/image';
import { fetchUserProfile } from '@compoents/util/http';

export async function fetchUserProfileData({ accessToken }) {
  const UserInfo = await fetchUserProfile(accessToken);
  return UserInfo;
}

export default function UserProfile({ UserInfo }) {
  const [followingList, setFollowingList] = useState([]);
  const [followerList, setFollowerList] = useState([]);
  const [isFollowingModalOpen, setIsFollowingModalOpen] = useState(false);
  const [isFollowerModalOpen, setIsFollowerModalOpen] = useState(false);
  const defaultImage = "/kakaoImg.jpg";
  


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
    {UserInfo ? (
      <div className={styles.profileInfo}>
        <h2 className={styles.profileTitle}>사용자 프로필 정보</h2>
        <div className={styles.profileItem}>
          <Image
            src={UserInfo.image || defaultImage}
            alt="이미지"
            width={200}
            height={300}
          />
        </div>
        <p className={styles.profileItem}>닉네임: {UserInfo.nickName}</p>
        <p className={styles.profileItem}>이름: {UserInfo.name}</p>
        <p className={styles.profileItem}>이메일: {UserInfo.email}</p>
        <p className={styles.profileItem}>내 포인트: {UserInfo.point} point</p>
        <div className={styles.followListContainer}>
          <button className={styles.followButton} onClick={openFollowingModal}>팔로잉 {UserInfo.following}</button>
          {isFollowingModalOpen && (
            <div className={styles.modal}>
              <button className={styles.closeButton} onClick={closeFollowingModal}>닫기</button>
            </div>
          )}
        </div>
        <div className={styles.followListContainer}>
          <button className={styles.followButton} onClick={openFollowerModal}>팔로워 {UserInfo.follower}</button>
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

const ProfileContainer = styled.div`
  margin: 20px;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 10px;
`;

const ProfileInfo = styled.div`
  margin-bottom: 20px;
`;

const ProfileTitle = styled.h2`
  font-size: 24px;
  margin-bottom: 10px;
`;

const ProfileItem = styled.p`
  font-size: 16px;
  margin-bottom: 5px;
`;

const FollowListContainer = styled.div`
  margin-top: 20px;
`;

const FollowButton = styled.button`
  font-size: 16px;
  padding: 5px 10px;
  background-color: #f1f1f1;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const CloseButton = styled.button`
  
`

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100
`;

const ProfileLoading = styled.p`
  font-size: 16px;
`;

