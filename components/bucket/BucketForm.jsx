'use client';
import * as PortOne from "@portone/browser-sdk/v2";
import React, { useState, useEffect } from "react";
import { LikeList, DeleteLike } from "@compoents/util/post-util";
import { memberPay, completePay } from "@compoents/util/payment-util";
import styles from "./BucketForm.module.css";
import Image from "next/image";

export default function BucketForm({ nick_name, accessToken }) {
    const [userLikes, setUserLikes] = useState([]);
    const [payments_list, setPays] = useState([]);
    const [selectedAmount, setSelectedAmount] = useState(0);
    const [createdAt, setCreatedAt] = useState('');
    const [purchases, setPurchase] = useState('');
    const [selectAll, setSelectAll] = useState(false);

    useEffect(() => {
        const currentDate = new Date().toISOString().split('T')[0]; // 현재 날짜
        setCreatedAt(currentDate);

        const fetchUserLikeProducts = async () => {
            try {
                const data = await LikeList(nick_name);
                setUserLikes(data.likeProducts);
                console.log(data);
            } catch (error) {
                console.error('사용자의 좋아하는 상품을 가져오는 중 오류가 발생했습니다.', error);
            }
        };

        fetchUserLikeProducts();
    }, []);

    // 전체 선택 체크박스를 클릭했을 때의 핸들러
    const handleSelectAllChange = () => {
        setSelectAll(!selectAll); // 상태를 반전시킴
        if (!selectAll) {
            // 전체 선택
            setPays(userLikes.map(like => ({
                product_name: like.productName,
                product_id: like.productId,
                product_point: like.price,
                seller: like.userEmail,
                purchase_at: createdAt
            })));
            setSelectedAmount(userLikes.reduce((total, like) => total + like.price, 0));
        } else {
            // 전체 선택 해제
            setPays([]);
            setSelectedAmount(0);
        }
    };

    // 개별 상품의 체크박스 클릭 핸들러
    const handleCheckboxChange = (productId, price) => {
        const selectedProductIndex = payments_list.findIndex(product => product.product_id === productId);
        if (selectedProductIndex === -1) {
            // 상품이 선택되지 않은 경우, 상품 정보를 추가합니다.
            const product = userLikes.find(like => like.productId === productId);
            setPays([...payments_list, {
                product_name: product.productName,
                product_id: product.productId,
                product_point: product.price,
                seller: product.userEmail,
                purchase_at: createdAt
            }]);
            setSelectedAmount(selectedAmount + price);
        } else {
            // 상품이 선택된 경우, 해당 상품 정보를 제거합니다.
            const updatedpayments_list = [...payments_list];
            updatedpayments_list.splice(selectedProductIndex, 1);
            setPays(updatedpayments_list);
            setSelectedAmount(selectedAmount - price);
        }
    };

    const handlePurchase = async () => {
        
        const paymentData = {
            total_point: selectedAmount,
            payments_list
          };

          console.log(paymentData);
        const response = await memberPay(accessToken, paymentData);
        setPurchase(response);
        const point = response.point;
        console.log(response);
        if (response.charge == true) { // 구매 실패 시
            const confirmPurchase = window.confirm(`${response.message} ${response.point} 만큼 충전하시겠습니까?`);
            if (confirmPurchase) {
                handleSetPoint(point);
            }
        } else { // 구매 성공시 false로 와서 구매 성공 메시지 창 띄움
            alert(response.message)
        }

    };

    const handleSetPoint = async (point) => {

        const currentDate = new Date().toISOString().split('T')[0]; // 현재 날짜
        setCreatedAt(currentDate);
        console.log(currentDate);

        const response = await PortOne.requestPayment({
            storeId: "store-8c143d19-2e6c-41e0-899d-8c3d02118d41",
            channelKey: "channel-key-0c38a3bf-acf3-4b38-bf89-61fbbbecc8a8",
            paymentId: `${crypto.randomUUID()}`, //결제 건을 구분하는 문자열로, 결제 요청 및 조회에 필요합니다. 같은 paymentId에 대해 여러 번의 결제 시도가 가능하나, 최종적으로 결제에 성공하는 것은 단 한 번만 가능합니다. (중복 결제 방지)
            orderName: "point 충전", // 총 금액
            totalAmount: point, // 총 금액
            currency: "CURRENCY_KRW",
            payMethod: "EASY_PAY",
        });
        if (response.code != null) {
            return alert(response.message);
        }
        const validationData = {
            payment_id: response.paymentId,
            total_point: point,
            created_at: createdAt,
            payments_list
          };

        const validation = await completePay(accessToken, validationData);
        if (validation.charge == true) {
            alert(validation.message);
        } else {
            alert(validation.message);
        }
    };

    const handleDeleteLike = async (like) => {
        try {
            const accessToken = localStorage.getItem('Authorization');
            await DeleteLike(accessToken, like.productId);
            setUserLikes(userLikes.filter((item) => item.productId !== like.productId));
        } catch (error) {
            console.error('좋아하는 상품 삭제 중 오류가 발생했습니다.', error);
        }
    }

    return (
        <>
            <section className={styles.section1}>
                <h1 className={styles.bktitle}>장바구니</h1>
                <label className={styles.AllLable}>
                    <input
                        type="checkbox"
                        checked={selectAll}
                        onChange={handleSelectAllChange}
                        className={styles.AllInput}
                    />
                    전체 선택
                </label>
                
            </section>
            <section className={styles.section2}>
                <ul className={styles.postsGrid}>
                    {userLikes.map((like) => (
                        <div key={like.productId} className={styles.postItem}>
                            <input
                                type='checkbox'
                                id={like.productId}
                                className={styles.Checkboxes}
                                onChange={() => handleCheckboxChange(like.productId, like.price)}
                                checked={payments_list.some(product => product.product_id === like.productId)}
                            />
                            <div className={styles.flexes}>
                                <Image src={like.imageProduct} alt="상품 사진" width={150} height={150} className={styles.IpImg} />
                                <div className={styles.PrdName}>{like.productName}</div>
                                <div className={styles.position}>
                                <button className={styles.DtBtn} onClick={() => handleDeleteLike(like)}>삭제하기 <Image src={'/svgs/Close_round.svg'} width={24} height={24} alt="" className={styles.svgs} /></button>
                                <button className={styles.OdBtn}>구매하기 <Image src={'/svgs/Box_alt_fill.svg'} width={24} height={24} alt="" className={styles.svgs}/></button>
                                </div>
                            </div>
                        </div>
                    ))}
                    <div>선택한 상품 금액 : {selectedAmount}</div>
                </ul>
                <button className={styles.SelectBtn} onClick={handlePurchase} style={{ display: payments_list.length > 0 ? 'block' : 'none' }}>
                선택 상품 구매하기
                </button>
            </section>
        </>
    );
}