import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Link from 'next/link';


// 프로필 모달 컴포넌트
export default function SmallProfile() {
    // 모달 열기/닫기 상태를 관리하는 state
    const [isOpen, setIsOpen] = useState(false);
    const [Authorization, setAccessToken] = useState("");
    useEffect(() => {
        const storedAccessToken = localStorage.getItem('Authorization');
        if (storedAccessToken) {
            setAccessToken(storedAccessToken);
        }
    }, []);

    function logoutHandler() {
        localStorage.removeItem('Authorization');
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
        <div>
            {/* 프로필 사진 */}
            <ProfileImage src="/kakaoImg.jpg" alt="사진" onClick={openModal} />

            {/* 프로필 모달 */}
            {isOpen && (
                <ModalBackground onClick={closeModal}>
                    <ModalContent>
                        <h1>이름</h1>
                        <h2>나이</h2>
                        <Button>
                            <Link href="/profile">프로필</Link>
                        </Button>
                        {Authorization && (
                            <Button onClick={logoutHandler}>
                                로그아웃
                            </Button>
                        )}
                        {Authorization && (
                            <Button>
                                <Link href="/getpoint" passHref>
                                    포인트 구매
                                </Link>
                            </Button>
                        )}
                        {Authorization && (
                            <Button>
                                <Link href="/posts" passHref>
                                    상품 보러가기
                                </Link>
                            </Button>
                        )}
                    </ModalContent>
                </ModalBackground>

            )}


        </div>
    );
};

// 스타일드 컴포넌트를 사용하여 프로필 이미지 스타일링
const ProfileImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
`;

// 모달 배경 스타일드 컴포넌트
const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); // 반투명 배경색
  display: flex;
  justify-content: center;
  align-items: center;
`;

// 모달 콘텐츠 스타일드 컴포넌트
const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
`;

const Button = styled.button`
font: inherit;
background-color: transparent;
color: black;
font-weight: bold;
padding: 0.5rem 1.5rem;
border-radius: 6px;
cursor: pointer;
`;
