import { getSelling } from "@compoents/util/http";

import { useState, useEffect } from "react";
import CommuPosts from "../posts/commu-post";
import styles from "./ProductsComponent.module.css";

export default function ProductsComponent({nick_name}){
    const [userproducts, setUserProducts] = useState('');

    useEffect(() => {
        const accessToken = localStorage.getItem('Authorization');
        const fetchUserProducts = async () => {
            try {
                if (!accessToken) {
                    throw new Error('로그인이 필요합니다.');
                }
                const data = await getSelling(nick_name);
                setUserProducts(data);
                console.log(data);
            } catch (error) {
                console.error('사용자의 좋아하는 상품을 가져오는 중 오류가 발생했습니다.', error);
            }
        };

        fetchUserProducts();
    }, [nick_name]);

    return (
        <>
        <section className={styles.section}>
        <CommuPosts posts={userproducts} />
        </section>
        </>
    )
}