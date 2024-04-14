'use client';
import React, { useState, useEffect } from "react";
import { LikeList } from "@compoents/util/post-util"; // LikeList 함수를 가져옴
import styles from "./BucketForm.module.css";
import Image from "next/image";

export default function BucketForm() {
    const [userLikes, setUserLikes] = useState([]);
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [selectedAmount, setSelectedAmount] = useState(0); 
    const [createdAt, setCreatedAt] = useState('');
    const [purchases, setPurchase] = useState('');
    const [selectAll, setSelectAll] = useState(false);
    
    useEffect(() => {
        const currentDate = new Date().toISOString().split('T')[0]; // 현재 날짜
        setCreatedAt(currentDate);
        console.log(currentDate);

        const accessToken = localStorage.getItem('Authorization');
        const fetchUserLikeProducts = async () => {
            try {
                if (!accessToken) {
                    throw new Error('로그인이 필요합니다.');
                }
                const data = await LikeList(accessToken);
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
            setSelectedProducts(userLikes.map(like => ({
                product_name: like.productName,
                product_id: like.productId,
                product_point: like.price,
                seller: like.userEmail,
                purchase_at: createdAt
            })));
            setSelectedAmount(userLikes.reduce((total, like) => total + like.price, 0));
        } else {
            // 전체 선택 해제
            setSelectedProducts([]);
            setSelectedAmount(0);
        }
    };

    // 개별 상품의 체크박스 클릭 핸들러
    const handleCheckboxChange = (productId, price) => {
        const selectedProductIndex = selectedProducts.findIndex(product => product.product_id === productId);
        if (selectedProductIndex === -1) {
            // 상품이 선택되지 않은 경우, 상품 정보를 추가합니다.
            const product = userLikes.find(like => like.productId === productId);
            setSelectedProducts([...selectedProducts, {
                product_name: product.productName,
                product_id: product.productId,
                product_point: product.price,
                seller: product.userEmail,
                purchase_at: createdAt
            }]);
            setSelectedAmount(selectedAmount + price);
        } else {
            // 상품이 선택된 경우, 해당 상품 정보를 제거합니다.
            const updatedSelectedProducts = [...selectedProducts];
            updatedSelectedProducts.splice(selectedProductIndex, 1);
            setSelectedProducts(updatedSelectedProducts);
            setSelectedAmount(selectedAmount - price);
        }
    };

    const handlePurchase = async () => {
        console.log(selectedProducts);
        console.log(selectedAmount);

        const accessToken = localStorage.getItem('Authorization');
        const responses = await fetch("http://localhost:8888/member/payments", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            'Authorization': `${accessToken}`
          },
          body: JSON.stringify({      // 리스트로 담아서
            total_price: selectedAmount, // 총 금액 구하는 로직 + 총 금액은 리스트 밖에다 보내기
            payments_list : selectedProducts,
          })
        });
        const data = await responses.json();
        setPurchase(data);
        console.log(data);
        if (data.charge == true) { // 구매 실패 시
          const confirmPurchase = window.confirm(`${data.message} ${data.charge} 만큼 충전하시겠습니까?`);
          if (confirmPurchase) {
            handleSetPoint(); 
          }
      } else { // 구매 성공시 false로 와서 구매 성공 메시지 창 띄움
        alert(data.message)
      }
    
    };
    
    const handleSetPoint = async () => {
        const accessToken = localStorage.getItem('Authorization');
    
        const currentDate = new Date().toISOString().split('T')[0]; // 현재 날짜
        setCreatedAt(currentDate);
        console.log(currentDate);
    
        const response = await PortOne.requestPayment({
          storeId: "store-8c143d19-2e6c-41e0-899d-8c3d02118d41",
          channelKey: "channel-key-0c38a3bf-acf3-4b38-bf89-61fbbbecc8a8",
          paymentId: `${crypto.randomUUID()}`, //결제 건을 구분하는 문자열로, 결제 요청 및 조회에 필요합니다. 같은 paymentId에 대해 여러 번의 결제 시도가 가능하나, 최종적으로 결제에 성공하는 것은 단 한 번만 가능합니다. (중복 결제 방지)
          orderName: purchases.point, // 총 금액
          totalAmount: purchases.point, // 총 금액
          currency: "CURRENCY_KRW",
          payMethod: "EASY_PAY",
        });
        if (response.code != null) {
          return alert(response.message);
        } 
        
        
    
        const validation = await fetch("http://localhost:8888/payments/complete", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            'Authorization': `${accessToken}`
          },
          body: JSON.stringify({
            payment_id: response.paymentId,
            difference_amount: purchases.point, // 부족한 금액
            created_at: createdAt,// 지금 시간
            productInfoList : [
              {
              product_id: params.productId, // 여기부터 판매자 이메일 까지 리스트로 
              original_amount: post.price,
              seller_email: post.userEmail,// 판매자 이메일
          },
        ]
          })
        });
        const Endresponse = await validation.json();
        if (Endresponse.state == true) {
          alert(Endresponse.message);
        } else {
          alert(Endresponse.message);
        }
    };

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
                <div>선택한 상품 금액 : {selectedAmount}</div> 
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
                            checked={selectedProducts.some(product => product.product_id === like.productId)}
                            
                        />
                        <Image src={like.imageProduct} alt="상품 사진" width={150} height={150}/>
                        {like.productName}
                        {like.price}
                    </div>
                ))}
            </ul>
            <button className={styles.SelectBtn} onClick={handlePurchase}>선택 상품 구매하기</button>
            </section>
        </>
    );
}