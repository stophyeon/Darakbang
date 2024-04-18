'use client';
import * as PortOne from "@portone/browser-sdk/v2";
import DeletePostButton from '@compoents/components/posts/Delete-button';
import { getPostData } from '@compoents/util/post-util';
import styles from './page.module.css'
import Image from 'next/image';
import Link from 'next/link';
import LoadingIndicator from "@compoents/components/UI/LoadingIndicator";
import { memberPay, completePay } from "@compoents/util/payment-util";

import { useState, useEffect } from 'react';
import PutDetailbutton from '@compoents/components/posts/Edit-button';


export default function PostDetailPage({ params }) {
  const [accessToken, setAccessToken] = useState('');
  const [post, setPosts] = useState('');
  const [postList, setPostList] = useState('');
  const [purchases, setPurchase] = useState('');
  const [createdAt, setCreatedAt] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const accessTokenFromLocalStorage = localStorage.getItem('Authorization');
    if (accessTokenFromLocalStorage) {
      setAccessToken(accessTokenFromLocalStorage);
    }
    const currentDate = new Date().toISOString().split('T')[0]; // 현재 날짜
    // // const currentTime = new Date().toISOString().split('T')[1].split('.')[0]; // 현재 시간
    // const currentDateTime = `${currentDate}`; // 현재 날짜와 시간을 합침시간 : ${currentTime}
    setCreatedAt(currentDate);
    const fetchPosts = async () => {
      const postdata = await getPostData(params.productId, accessToken);
      if (postdata) {
        setPosts(postdata.product);
        setPostList(postdata);
        setLoading(false);
      }
      else {
        alert('게시물안받아옴')
      }
    }
    fetchPosts()
  }, [accessToken]);


  const handlePurchase = async () => {

    if (!accessToken) {
      alert("로그인이 필요합니다. 로그인 창으로 이동합니다.");
      window.location.href = "/user/login";
      return;
    }

    const paymentData = {
      total_point: post.price,
      payments_list: [
        {
          product_name: post.productName,
          product_id: parseInt(params.productId),
          product_point: post.price,
          seller: post.userEmail,
          purchase_at: createdAt
        }
      ]
    };
    const response = await memberPay(accessToken, paymentData);
    setPurchase(response);
    console.log(response);
    if (response.charge === true) { // 구매 실패 시
      const confirmPurchase = window.confirm(`${response.message} ${response.point} 만큼 충전하시겠습니까?`);
      if (confirmPurchase) {
        handleSetPoint(); 
      }
  } else { // 구매 성공시 false로 와서 구매 성공 메시지 창 띄움
    alert(response.message)
  }

  };

  const handleSetPoint = async () => {

    const currentDate = new Date().toISOString().split('T')[0]; // 현재 날짜
    // // const currentTime = new Date().toISOString().split('T')[1].split('.')[0]; // 현재 시간
    // const currentDateTime = `${currentDate}`; // 현재 날짜와 시간을 합침시간 : ${currentTime}
    setCreatedAt(currentDate);
    console.log(currentDate)

    const response = await PortOne.requestPayment({
      storeId: "store-8c143d19-2e6c-41e0-899d-8c3d02118d41",
      channelKey: "channel-key-0c38a3bf-acf3-4b38-bf89-61fbbbecc8a8",
      paymentId: `${crypto.randomUUID()}`, //결제 건을 구분하는 문자열로, 결제 요청 및 조회에 필요합니다. 같은 paymentId에 대해 여러 번의 결제 시도가 가능하나, 최종적으로 결제에 성공하는 것은 단 한 번만 가능합니다. (중복 결제 방지)
      orderName: 'point 충전', // 주문 내용을 나타내는 문자열입니다. 특정한 형식이 있지는 않지만, 결제 처리에 필요하므로 필수적으로 전달해 주셔야 합니다.
      totalAmount: Number(purchases.point), //selectedAmount currency는 결제 금액과 결제 화폐를 지정합니다.
      currency: "CURRENCY_KRW",
      payMethod: "EASY_PAY",
      redirectUrl: `http://localhost:3000`,
    });
    if (response.code != null) {
      return alert(response.message);
    } 
    
    

    const validationData = {
      payment_id: response.paymentId,
      total_point: purchases.point,
      created_at: createdAt,
      payments_list: [
        {
          product_id: parseInt(params.productId),
          product_point: post.price,
          seller: post.userEmail,
          purchase_at: createdAt
        }
      ]
    };
    const Endresponse = await completePay(accessToken, validationData);

    console.log(Endresponse);
    if (Endresponse.charge == true) {
      alert(Endresponse.message);
    } else {
      alert(Endresponse.message);
    }
    
    // state==false, message="구매 성공"
  }

  return (
    <>
      {loading ? ( // 로딩 중인 경우에만 로딩 스피너를 표시
        <LoadingIndicator />
      ) : (
        <>
      <DeletePostButton postpage={params.postpage} productId={params.productId} />
      <PutDetailbutton postpage={params.postpage} productId={params.productId} accessToken={accessToken} />
        <div className={styles.postForm}>
          <div className={styles.productCtr}>
            <Image src={post.imageProduct} alt='상품 이미지' width={600} height={600} className={styles.productImg} />
          </div>
          <div className={styles.profiles}>
            <Image src={'/kakaoImg.jpg'} alt='프로필 이미지' width={78} height={78} className={styles.ProImg} />
            <p className={styles.nickNames}>{post.nickName}</p>
          </div>
          <div className={styles.verticalLine}></div>
          <div className={styles.prdName}>{post.productName}</div>
          <div className={styles.price}>{post.price}원</div>
          <div className={styles.buttons}>
            <button className={styles.like}>좋아요 ♡</button>
            <button className={styles.buy} onClick={handlePurchase} >구매하기</button>
          </div>
          <div className={styles.anotherLine}></div>
          <div>
            <p  className={styles.recomePrd}>추천 상품</p>
            <ul className={styles.postsGrid}>
              {postList && postList.productList.map((posts) => (
                <div key={posts.productId} className={styles.postItem}>
                  <Link href={`/${params.postpage}/${posts.productId}`} style={{ textDecoration: "none" }}>
                  <div><Image src={posts.imageProduct || '/defaultImg.jpg'} alt="상품" width={350} height={350} className={styles.ListImgs}/></div>
                  <div className={styles.ListprdName}>{posts.productName}</div>
                  <div className={styles.ListPrice}>{posts.price}원</div>
                  </Link>
                </div>
              ))}
            </ul>
          </div>
        </div>
        </>
    )}
    </>
  );
}
