import React, { useState, useEffect } from 'react';
import styles from './SmallProfile.module.css';
import Link from 'next/link';
import Image from 'next/image';


import { fetchUserProfile } from '@compoents/util/http';



// 프로필 모달 컴포넌트
export default function SmallProfile() {
    // 모달 열기/닫기 상태를 관리하는 state
    const [isOpen, setIsOpen] = useState(false);
    const [userInfo, setUserInfo] = useState('');
    const [Authorization, setAccessToken] = useState("");

    const defaultImage = "/kakaoImg.jpg";

    useEffect(() => {
        const fetchUserProfileData = async () => {
            const accesstoken = localStorage.getItem('Authorization');
            if (accesstoken) {
                setAccessToken(accesstoken);
            }
            const data = await fetchUserProfile(accesstoken);
            setUserInfo(data);
        }
        fetchUserProfileData();
    }, []);

    function logoutHandler() {
        localStorage.removeItem('Authorization');
        localStorage.removeItem("expiration");
        window.location.href = "http://localhost:3000"
    }
    // 모달 열기 함수
    const openModal = () => {
        setIsOpen(true);
    };

    // 모달 닫기 함수
    const closeModal = () => {
        setIsOpen(false);
    };

    return (
        <div className={styles.Modaldiv}>
            {/* 프로필 사진 */}
            <img className={styles.profileImage} src={userInfo.image || defaultImage}
                alt="이미지" onClick={openModal} />

            {/* 프로필 모달 */}
            {isOpen && (
                <div className={styles.modalBackground} onClick={closeModal}>
                    <div className={styles.modalContent}>
                        <div><Image
                            src={userInfo.image || defaultImage}
                            alt="이미지"
                            width={70}
                            height={100}
                        /></div>
                        <h1>{userInfo.name}</h1>
                        <h2>{userInfo.email}</h2>
                        <h2>{userInfo.point} point</h2>
                        <button className={styles.button}>
                            <Link href="/profile" style={{ textDecoration: "none" }}>프로필</Link>
                        </button>
                        {Authorization && (
                            <button className={styles.button} onClick={logoutHandler}>
                                로그아웃
                            </button>
                        )}
                        {Authorization && (
                            <button className={styles.button}>
                                <Link href="/getpoint" passHref style={{ textDecoration: "none" }}>
                                    포인트 구매
                                </Link>
                            </button>
                        )}
                        {Authorization && (
                            <button className={styles.button}>
                                <Link href="/posts" passHref style={{ textDecoration: "none" }}>
                                    상품 보러가기
                                </Link>
                            </button>
                        )}
                    </div>
                </div>

            )}


        </div>
    );
};
