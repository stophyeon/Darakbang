"use client";
import React, { useState, useEffect } from "react";
import * as PortOne from "../../node_modules/@portone/browser-sdk/dist/v2";

export default function PaymentButton() {
  const [totalAmount, setTotalAmount] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [orderName, setOrderName] = useState("");

  const requestPayment = async () => {
    const response = await PortOne.requestPayment({
      storeId: "store-8c143d19-2e6c-41e0-899d-8c3d02118d41",
      channelKey: "channel-key-0c38a3bf-acf3-4b38-bf89-61fbbbecc8a8",
      paymentId: `${crypto.randomUUID()}`, //결제 건을 구분하는 문자열로, 결제 요청 및 조회에 필요합니다. 같은 paymentId에 대해 여러 번의 결제 시도가 가능하나, 최종적으로 결제에 성공하는 것은 단 한 번만 가능합니다. (중복 결제 방지)
      orderName: orderName, // 주문 내용을 나타내는 문자열입니다. 특정한 형식이 있지는 않지만, 결제 처리에 필요하므로 필수적으로 전달해 주셔야 합니다.
      totalAmount: totalAmount, //totalAmount와 currency는 결제 금액과 결제 화폐를 지정합니다.
      currency: "CURRENCY_KRW",
      payMethod: "EASY_PAY",
      redirectUrl: `http://localhost:3000`,
    });
    console.log(requestPayment);
    if (response.code != null) {
      return alert(response.message);
    }

    const validation = await fetch("http://localhost:7080/payments/complete", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        paymentId: response.paymentId,
        totalAmount: totalAmount,
        useremail:'test1@example.com',
        pointname: orderName,
      }),
    });

    const validationData = await validation.json();

  };

  useEffect(() => {
    // 여기에 원하는 동작을 추가
  }, []);

  return (
    <>
      <div>
  <label>
    <input type="checkbox" onChange={() => {setOrderName("5000point"), setTotalAmount(5000)}} />
    5000 포인트
  </label>
  <label>
    <input type="checkbox" onChange={() => {setOrderName("10000point"), setTotalAmount(10000)}} />
    10000 포인트
  </label>
  <label>
    <input type="checkbox" onChange={() => {setOrderName("20000point"), setTotalAmount(20000)}} />
    20000 포인트
  </label>
  <label>
    <input type="checkbox" onChange={() => {setOrderName("50000point"), setTotalAmount(50000)}} />
    50000 포인트
  </label>
  <label>
    <input type="checkbox" onChange={() => {setOrderName("100000point"), setTotalAmount(100000)}} />
    100000 포인트
  </label>
</div>


      <button onClick={requestPayment}>구매하세요!</button>
    </>
  );
}
