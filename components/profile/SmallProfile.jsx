'use client';
import styles from './SmallProfile.module.css';
import Link from 'next/link';
import Image from 'next/image';
import { fetchUserProfile } from '@compoents/util/http';
import { Popover, PopoverTrigger, PopoverContent, Button } from "@nextui-org/react";

export async function fetchUserProfileData({ accessToken }) {
    const UserInfo = await fetchUserProfile(accessToken);
    return UserInfo;
  }


export default function SmallProfile({ UserInfo }) {
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
                    src={UserInfo.image || defaultImage}
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
                    {Authorization && (
                        <Button onClick={logoutHandler}>
                            로그아웃
                        </Button>
                    )}
                </div>
                <div onClick={(e) => e.stopPropagation()}>
                    {Authorization && (
                        <Link href="/getpoint" passHref style={{ textDecoration: "none" }}>
                            <Button>포인트 구매</Button>
                        </Link>
                    )}
                    {Authorization && (
                        <Link href="/0" passHref style={{ textDecoration: "none" }}>
                            <Button>상품</Button>
                        </Link>
                    )}
                </div>
            </PopoverContent>
        </Popover>

    );
};
