'use client';
import styles from './SmallProfile.module.css';
import Link from 'next/link';
import Image from 'next/image';
import { Popover, PopoverTrigger, PopoverContent, Button } from "@nextui-org/react";



export default function SmallProfile() {
    const defaultImage = "/kakaoImg.jpg";

    function logoutHandler() {
        localStorage.removeItem('Authorization');
        localStorage.removeItem("expiration");
        window.location.href = "http://localhost:3000"
    }

    return (
        <Popover showArrow={true} placement="bottom">
            <PopoverTrigger>
                <Image
                    src={defaultImage} // UserInfo.image || 
                    alt="이미지"
                    width={70}
                    height={100}
                    className={styles.profileImage}
                />
            </PopoverTrigger>
            <PopoverContent className={styles.modalContent}>
                <div onClick={(e) => e.stopPropagation()}>
                    <Link href="/profile" style={{ textDecoration: "none" }}>
                        <Button>프로필</Button>
                    </Link>
                  
                        <Button onClick={logoutHandler}>
                            로그아웃
                        </Button>
                </div>
                <div onClick={(e) => e.stopPropagation()}>
                        <Link href="/getpoint" passHref style={{ textDecoration: "none" }}>
                            <Button>포인트 구매</Button>
                        </Link>
                        <Link href="/" passHref style={{ textDecoration: "none" }}>
                            <Button>상품</Button>
                        </Link>
                </div>
            </PopoverContent>
        </Popover>

    );
};
