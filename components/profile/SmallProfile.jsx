'use client';
import styles from './SmallProfile.module.css';
import Link from 'next/link';
import Image from 'next/image';
import { Popover, PopoverTrigger, PopoverContent, Button } from "@nextui-org/react";
import { useState, useEffect } from 'react';
import { RefreshAccessToken } from '@compoents/util/http';
import { fetchUserProfile } from '@compoents/util/Client';

export default function SmallProfile({ accessToken }) {
    const defaultImage = "/images/kakaoImg.jpg";
    const [userInfo, setuserInfo] = useState('')
    const linkbucket = `/profile/${userInfo.nick_name}`;

    function logoutHandler() {
        localStorage.removeItem('Authorization');
        document.cookie = 'Authorization' + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;' + "; path=/";
        document.cookie = 'refreshToken' + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;' + "; path=/";
        window.location.href = "http://localhost:3000"
    }
    useEffect(() => {
        // API 호출 -> 사용자 정보 받아오기
        async function fetchUserProfileData() {
          try {
            const data = await fetchUserProfile(accessToken);
            if (data.state == "Jwt Expired") {
                const NewaccessToken = await RefreshAccessToken();
                const Newdata = await fetchUserProfile(NewaccessToken);
                setuserInfo(Newdata);
                console.log(Newdata);
            } else {
                setuserInfo(data);
            }
            
          } catch (error) {
            console.error('사용자 프로필 정보를 가져오는 중 오류가 발생했습니다.', error);
          }
        };
        fetchUserProfileData();
      }, []);

    return (
        <Popover showArrow={true} placement="bottom">
            <PopoverTrigger>
                <Image
                    src={userInfo.image || defaultImage} // UserInfo.image || 
                    alt="이미지"
                    width={83}
                    height={83}
                    className={styles.profileImage}
                    priority
                />
            </PopoverTrigger>
            <PopoverContent className={styles.modalContent}>
                <div onClick={(e) => e.stopPropagation()}>
                    <Link href="/profile" style={{ textDecoration: "none" }}>
                        <Button className={styles.contents}>
                            프로필
                        </Button>
                    </Link>
                </div>
                <div className={styles.verticalLine}></div>
                <div onClick={(e) => e.stopPropagation()}>
                    <div style={{ textDecoration: "none" }}>
                        <Button className={styles.contents}>
                            보유 포인트 : {userInfo.point}원
                        </Button>
                    </div>
                </div>
                <div className={styles.verticalLine}></div>
                <div onClick={(e) => e.stopPropagation()}>
                    <Link href={linkbucket} passHref style={{ textDecoration: "none" }}>
                        <Button className={styles.contents}>
                            장바구니
                        </Button>
                    </Link>
                </div>
                <div className={styles.verticalLine}></div>
                <div onClick={(e) => e.stopPropagation()}>
                    <Button onClick={logoutHandler} className={styles.logcontents}>
                        로그아웃
                    </Button>
                </div>
            </PopoverContent>
        </Popover >

    );
};
