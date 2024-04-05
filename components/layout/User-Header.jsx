'use client';
import Link from "next/link";
import styles from './User-Header.module.css';

export default function UserHeader() {

    return (
        <>
            <header className={styles.headerContainer}>
                <Link href="/" legacyBehavior passHref>
                    <div className={styles.logo}>다락방</div>
                </Link>
            </header>
        </>
    );
}
