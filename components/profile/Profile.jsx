'use client';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import { fetchUserProfile } from '@compoents/util/http';

export default function UserProfile() {
  const [userInfo, setUserInfo] = useState('');
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
            <FollowListHeader>팔로잉 {userInfo.following}</FollowListHeader>
          </FollowListContainer>
          <FollowListContainer>
            <FollowListHeader>팔로워 {userInfo.follower}</FollowListHeader>
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

const FollowListHeader = styled.h3`
  font-size: 20px;
  margin-bottom: 10px;
`;

const ProfileLoading = styled.p`
  font-size: 16px;
`;

