import Link from "next/link";
import FindEventSection from "../items/ItemSearch";


import styles from './main-navigation.module.css'; 
import SmallProfile from "../profile/SmallProfile";

export default function MainNavigation({ accessToken }) {

    return (
        <>
            <header className={styles.headerContainer}>
                <Link href="/" legacyBehavior passHref>
                    <div className={styles.logo}>다락방</div>
                </Link>
                <div className={styles.navItem}>
                    <FindEventSection />
                </div>
                {!accessToken && (
                    <div className={styles.navItem3}>
                        <Link href="/user/login" passHref>
                            <button className={styles.navLink}>로그인</button>
                        </Link>
                    </div>
                )}
                {accessToken && (
                    <div className={styles.navItem3}>
                        <SmallProfile accessToken={accessToken}/>
                    </div>
                )}
            </header>
        </>
    );
}
