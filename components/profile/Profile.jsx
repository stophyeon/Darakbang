'use client';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import FollowList from './FollowList';

const UserProfile = () => {
  const [userInfo, setUserInfo] = useState(null);
  const followerList = [{ nickname:'김민우' }, { nickname:'정지현' }, { nickname:'임지혁' }];
  const followingList = [{ nickname:'김민우' }, { nickname:'정지현' }, { nickname:'임지혁' }];

  useEffect(() => {
    // API 호출 -> 사용자 정보 받아오기
    const fetchUserProfile = async () => {
      try {
        const accesstoken = localStorage.getItem('Authorization');
        
        // API 호출
        const response = await fetch('http://localhost:8080/member/profile', {
          headers: {
            'Authorization': `Bearer ${accesstoken}`
          }
        });
        const data = await response.json();
        setUserInfo(data);
      } catch (error) {
        console.error('사용자 프로필 정보를 가져오는 중 오류가 발생했습니다.', error);
      }
    };

    fetchUserProfile();
  }, []);

  return (
    <ProfileContainer>
      {userInfo ? (
        <ProfileInfo>
          <ProfileTitle>사용자 프로필 정보</ProfileTitle>
          <ProfileItem>닉네임: {userInfo.nick_name}</ProfileItem>
          <ProfileItem>이름: {userInfo.name}</ProfileItem>
          <ProfileItem>이메일: {userInfo.email}</ProfileItem>
          <FollowListContainer>
            <FollowListHeader>팔로잉 목록</FollowListHeader>
            <FollowList header="팔로잉 목록" data={followingList}/>
          </FollowListContainer>
          <FollowListContainer>
            <FollowListHeader>팔로워 목록</FollowListHeader>
            <FollowList header="팔로워 목록" data={followerList}/>
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

export default UserProfile;
