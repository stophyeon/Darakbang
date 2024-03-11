'use client';   
import React, { useEffect, useState } from 'react';

const UserProfile = () => {
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    // API 호출 -> 사용자 정보 받아오기
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem('Authorization');
        
        // API 호출
        const response = await fetch('http://localhost:8080/member/info', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        // 응답 데이터에서 사용자 프로필 정보 추출
        const data = await response.json();
        setUserInfo(data);
      } catch (error) {
        console.error('사용자 프로필 정보를 가져오는 중 오류가 발생했습니다.', error);
      }
    };

    fetchUserProfile();
  }, []);

  return (
    <div>
      {userInfo ? (
        <div>
          <h2>사용자 프로필 정보</h2>
          <p>닉네임: {userInfo.nick_name}</p>
          <p>이름: {userInfo.name}</p>
          {/* 추가적인 사용자 프로필 정보 표시 */}
        </div>
      ) : (
        <p>사용자 프로필 정보를 불러오는 중입니다...</p>
      )}
    </div>
  );
};

export default UserProfile;
