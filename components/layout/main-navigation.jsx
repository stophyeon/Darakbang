'use server';
import Link from "next/link";
import FindEventSection from "../items/ItemSearch";
import { cookies } from "next/headers";

import styles from './main-navigation.module.css'; // CSS 모듈 import
import SmallProfile from "../profile/SmallProfile";

export default async function MainNavigation() {
    const cookieStore = cookies();
    const Authorization = cookieStore.get("Authorization");

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
