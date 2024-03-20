'use client';
import Link from "next/link";
import FindEventSection from "../items/ItemSearch";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

import { FaUserLarge } from "react-icons/fa6";
import styles from './main-navigation.module.css'; // CSS 모듈 import
import SmallProfile from "../profile/SmallProfile";

export default function MainNavigation() {
    const [Authorization, setAccessToken] = useState("");

    useEffect(() => {
        const storedAccessToken = localStorage.getItem('Authorization');
        if (storedAccessToken) {
            setAccessToken(storedAccessToken);
        }
    }, []);    

    return (
        <>
            <header className={styles.headerContainer}>
                <Link href="/" legacyBehavior passHref>
                    <button className={styles.logo}>Darakbang</button>
                </Link>
                <nav className={styles.nav}>
                    <ul className={styles.navList}>
                        <li className={styles.navItem}>
                            <FindEventSection />
                        </li>
                        {!Authorization && (
                            <li className={styles.navItem2}>
                                <Link href="/login" passHref>
                                    <div className={styles.navLink}><FaUserLarge /></div>
                                </Link>
                            </li>
                        )}
                        {Authorization && (
                            <li className={styles.navItem2}>
                                <SmallProfile />
                            </li>
                        )}
                    </ul>
                </nav>
            </header>
        </>
    );
}
