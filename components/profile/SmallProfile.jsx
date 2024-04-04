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
                    width={83}
                    height={83}
                    className={styles.profileImage}
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
                    <Link href="/getpoint" passHref style={{ textDecoration: "none" }}>
                        <Button className={styles.contents}>
                            포인트 구매
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
