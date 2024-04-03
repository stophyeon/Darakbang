"use client";
import React, { useState } from "react";
import * as PortOne from "@portone/browser-sdk/v2";
import { Button } from '@nextui-org/button';

import stlyes from './PaymentButton.module.css';

export default function PaymentButton() {
  const [selectedAmount, setSelectedAmount] = useState("");
  const [orderName, setOrderName] = useState("");

  const handleInputChange = (event) => {
    setSelectedAmount(event.target.value);
    setOrderName(`${event.target.value}POINT`);
  };

  const requestPayment = async () => {

    const token = localStorage.getItem("Authorization");
    if (!token) {
      alert("로그인이 필요합니다. 로그인 창으로 이동합니다.");
      window.location.href = "/user/login";
      return;
    }

    const response = await PortOne.requestPayment({
      storeId: "store-8c143d19-2e6c-41e0-899d-8c3d02118d41",
      channelKey: "channel-key-0c38a3bf-acf3-4b38-bf89-61fbbbecc8a8",
      paymentId: `${crypto.randomUUID()}`, //결제 건을 구분하는 문자열로, 결제 요청 및 조회에 필요합니다. 같은 paymentId에 대해 여러 번의 결제 시도가 가능하나, 최종적으로 결제에 성공하는 것은 단 한 번만 가능합니다. (중복 결제 방지)
      orderName: orderName, // 주문 내용을 나타내는 문자열입니다. 특정한 형식이 있지는 않지만, 결제 처리에 필요하므로 필수적으로 전달해 주셔야 합니다.
      totalAmount: selectedAmount, //selectedAmount currency는 결제 금액과 결제 화폐를 지정합니다.
      currency: "CURRENCY_KRW",
      payMethod: "EASY_PAY",
      redirectUrl: `http://localhost:3000`,
    });
    if (response.code != null) {
      return alert(response.message);
    } 
    
    

    const validation = await fetch("http://localhost:8888/payments/complete", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'Authorization': `${token}`
      },
      body: JSON.stringify({
        payment_id: response.paymentId,
        total_amount: selectedAmount
      }),
    });
    
   
  }
  return (
    <>
      <div className={stlyes.container}>
        <input type="string" value={selectedAmount} onChange={handleInputChange} />
        <Button onClick={requestPayment} className={stlyes.button}>구매하세요!</Button>
      </div>
    </>
  );
}
