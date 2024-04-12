'use client';
import Image from "next/image";
import { useEffect, useState } from 'react';
import { fetchOtherUserProfile, followUser } from "@compoents/util/http";
import LoadingIndicator from "../UI/LoadingIndicator";
import styles from './OtherProfileform.module.css'

export default function OtherProfileform({ nick_name }) {
  const [userInfo, setuserInfo] = useState('');
  const [isFollowingModalOpen, setIsFollowingModalOpen] = useState(false);
  const [isFollowerModalOpen, setIsFollowerModalOpen] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const [accessToken, setAccessToken] = useState('');


  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const accessToken = localStorage.getItem('Authorization')
        if (accessToken) {
          setAccessToken(accessToken);
        }
        const data = await fetchOtherUserProfile(nick_name, accessToken);
        setuserInfo(data);
        console.log(data)
      } catch (error) {
        console.error('프로필 정보를 가져오는 중 오류가 발생했습니다.', error);
      }
    };
    fetchProfile();
  }, [nick_name]);

  const handleFollow = async () => {
    try {
      const accessToken = localStorage.getItem('Authorization')
      const response = await followUser(accessToken, userInfo.email);
      console.log('팔로우 요청이 성공했습니다.');
      setIsFollowing(true);
    } catch (error) {
      console.error('팔로우 요청 중 오류가 발생했습니다.', error);
    }
  };

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
        <>
        <div className={styles.profileInfo}>
          <div >
            <Image //img , `file://C:/Profile_img/${userInfo.image}}`
              src={userInfo.image || '/defaultImg.jpg'}  // require  `/${userInfo.image}.jpg` || // `file://C:/Profile_img/${userInfo.image}}` ||
              alt="이미지"
              width={200}
              height={200}
              className={styles.profileImg}
            />
          </div>
          <div className={styles.flexes}>
            <p className={styles.profileNickName}>{userInfo.nick_name}</p>
            
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
            <button onClick={handleFollow} className={styles.profileBtn} >
              {isFollowing ? '언팔로우' : '팔로우'}
            </button>
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
