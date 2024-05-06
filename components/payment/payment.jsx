'use client';
import * as PortOne from "@portone/browser-sdk/v2";
import { useState } from 'react';
import { memberPay, completePay } from '@compoents/util/payment-util';
import { useRouter } from 'next/navigation';
import styles from './payment.module.css';



export default function Payment({ accessToken, productId, post }){
  const [purchases, setPurchase] = useState('');
  const router = useRouter();

  const handlePurchase = async () => {
    const currentDate = new Date().toISOString().split('T')[0];

    if (!accessToken) {
      alert("로그인이 필요합니다. 로그인 창으로 이동합니다.");
      router.push("/user/login");
      return;
    }

    const paymentData = {
      total_point: post.price,
      payments_list: [
        {
          product_name: post.productName,
          product_id: parseInt(productId),
          product_point: post.price,
          seller: post.userEmail,
          purchase_at: currentDate
        }
      ]
    };

    try {
      const response = await memberPay(accessToken, paymentData);
      setPurchase(response);
      if (response.charge === true) {
        const confirmPurchase = window.confirm(`${response.message} ${response.point} 만큼 충전하시겠습니까?`);
        if (confirmPurchase) {
          handleSetPoint(response.point);
        }
      } else {
        alert(response.message);
      }
    } catch (error) {
      console.error('좋아요 요청을 보내는 중 오류가 발생했습니다.', error);
    }
  };

  const handleSetPoint = async (point) => {
    const currentDate = new Date().toISOString().split('T')[0];

    try {
      const response = await PortOne.requestPayment({
        storeId: "store-8c143d19-2e6c-41e0-899d-8c3d02118d41",
        channelKey: "channel-key-0c38a3bf-acf3-4b38-bf89-61fbbbecc8a8",
        paymentId: `${crypto.randomUUID()}`,
        orderName: 'point 충전',
        totalAmount: point,
        currency: "CURRENCY_KRW",
        payMethod: "EASY_PAY",
        redirectUrl: `http://localhost:3000`,
      });
      
      if (response.code != null) {
        return alert(response.message);
      } 

      const validationData = {
        payment_id: response.paymentId,
        total_point: point,
        created_at: currentDate,
        payments_list: [
          {
            product_id: parseInt(productId),
            product_point: post.price,
            seller: post.userEmail,
            purchase_at: currentDate
          }
        ]
      };

      const Endresponse = await completePay(accessToken, validationData);
      if (Endresponse.charge == true) {
        alert(Endresponse.message);
      } else {
        alert(Endresponse.message);
      }
    } catch (error) {
      console.error('포인트 설정 중 오류가 발생했습니다.', error);
    }
  };

  return (
    <div>
      <button className={styles.buy} onClick={handlePurchase}>
        구매하기
      </button>
    </div>
  );
};

