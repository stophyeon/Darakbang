'use client';
import { usePathname } from "next/navigation";
import Image from "next/image";
import { useEffect, useState } from 'react';
import { fetchOtherUserProfile, followUser } from "@compoents/util/http";
import LoadingIndicator from "../UI/LoadingIndicator";

export default function OtherProfileform() {
  const router = usePathname();
  const nickName = (router.split('/')[2]);
  
  const [profile, setProfile] = useState(null);
  const [isFollowing, setIsFollowing] = useState(false);
  const email = profile?.email || '';


  

  useEffect(() => {
    const accessToken = localStorage.getItem("Authorization"); 
    const fetchProfile = async () => {
      try {
        const data = await fetchOtherUserProfile(nickName, accessToken);
        setProfile(data);
      } catch (error) {
        console.error('프로필 정보를 가져오는 중 오류가 발생했습니다.', error);
      }
    };

    if (nickName) {
      fetchProfile();
    }
  }, [nickName]);

  const handleFollow = async () => {
    try { 

      const response = await followUser(accessToken, email);
      console.log('팔로우 요청이 성공했습니다.');
      setIsFollowing(true); 
    } catch (error) {
      console.error('팔로우 요청 중 오류가 발생했습니다.', error);
    }
  };

  if (!profile) {
    return  <LoadingIndicator />
  }

  return (
    <div>
      <h1>프로필</h1>
      <Image
            src={profile.image || "/kakaoImg.jpg"}
            alt="이미지"
            width={200}
            height={300}
            priority={true}
          />
      <p>이름: {profile.name}</p>
      <p>닉네임: {profile.nickName}</p>
      <p>팔로잉: {profile.following}</p>
      <p>팔로워: {profile.follower}</p>
      <button onClick={handleFollow} >
        {isFollowing ? '언팔로우' : '팔로우'}
      </button>
    </div>
  );
};
