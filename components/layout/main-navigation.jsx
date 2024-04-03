'use client';
import Link from "next/link";
import FindEventSection from "../items/ItemSearch";
import { useState, useEffect } from "react";

import styles from './main-navigation.module.css'; // CSS 모듈 import
import SmallProfile from "../profile/SmallProfile";

export default function MainNavigation() {
    const [Authorization, setAccessToken] = useState("");

    useEffect(() => {
        const AccessToken = localStorage.getItem('Authorization');
        if (AccessToken) {
            setAccessToken(AccessToken);
        }
    }, []); 

    return (
        <>
            <header className={styles.headerContainer}>
                <Link href="/" legacyBehavior passHref>
                    <div className={styles.logo}>다락방</div>
                </Link>
                <div className={styles.navItem}>
                    <FindEventSection />
                </div>
                {!Authorization && (
                    <div className={styles.navItem2}>
                        <Link href="/user/login" passHref>
                            <button className={styles.navLink}>로그인</button>
                        </Link>
                    </div>
                )}

                {Authorization && (
                    <div className={styles.navItem2}>
                        <SmallProfile accessToken={Authorization}/>
                    </div>
                )}
            </header>
        </>
    );
}
