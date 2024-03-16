'use client';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import { fetchUserProfile } from '@compoents/util/http';

export default function UserProfile() {
  const [userInfo, setUserInfo] = useState('');
  const [followingList, setFollowingList] = useState([]);
  const [followerList, setFollowerList] = useState([]);
  const [isFollowingModalOpen, setIsFollowingModalOpen] = useState(false);
  const [isFollowerModalOpen, setIsFollowerModalOpen] = useState(false);
  const defaultImage = "/kakaoImg.jpg";

  useEffect(() => {
    // API 호출 -> 사용자 정보 받아오기
    const fetchUserProfileData = async () => {
      try {
        const accesstoken = localStorage.getItem('Authorization');
        const data = await fetchUserProfile(accesstoken);
        setUserInfo(data);
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
    <ProfileContainer>
      {userInfo ? (
        <ProfileInfo>
          <ProfileTitle>사용자 프로필 정보</ProfileTitle>
          <ProfileItem>
            <Image
              src={userInfo.image || defaultImage}
              alt="이미지"
              width={200}
              height={300}
            />
          </ProfileItem>
          <ProfileItem>닉네임: {userInfo.nickName}</ProfileItem>
          <ProfileItem>이름: {userInfo.name}</ProfileItem>
          <ProfileItem>이메일: {userInfo.email}</ProfileItem>
          <ProfileItem>내 포인트: {userInfo.point} point</ProfileItem>
          <FollowListContainer>
            <FollowButton onClick={openFollowingModal}>팔로잉 {userInfo.following}</FollowButton>
            {isFollowingModalOpen && (
              <Modal>
                <CloseButton onClick={closeFollowingModal}>닫기</CloseButton>
              </Modal>
            )}
          </FollowListContainer>
          <FollowListContainer>
            <FollowButton onClick={openFollowerModal}>팔로워 {userInfo.follower}</FollowButton>
            {isFollowerModalOpen && (
              <Modal>
                {/* 팔로워 리스트 표시 */}
                <CloseButton onClick={closeFollowerModal}>닫기</CloseButton>
              </Modal>
            )}
          </FollowListContainer>
        </ProfileInfo>
      ) : (
        <ProfileLoading>사용자 프로필 정보를 불러오는 중입니다...</ProfileLoading>
      )}
    </ProfileContainer>
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

