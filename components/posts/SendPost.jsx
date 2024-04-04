'use client';
import { useState, useEffect } from 'react';
import { BsSendFill } from "react-icons/bs";
import styles from './SendPost.module.css';
import { useRouter } from 'next/navigation';

import { sendProductData } from '@compoents/util/post-util';
import { fetchUserProfile } from '@compoents/util/http';

// export async function fetchUserProfileData({ accessToken }) {
//   const UserInfo = await fetchUserProfile(accessToken);
//   return UserInfo;
// }


export default function ProductForm() {
  const router = useRouter()

  const [productName, setProductName] = useState('');
  const [price, setPrice] = useState('');
  const [images1, setImages1] = useState();
  const [images2, setImages2] = useState();
  const [createdAt, setCreatedAt] = useState('');
  const [expireAt, setexpireAt] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [accessToken, setAccessToken] = useState('');

  useEffect(() => {
    const AccessTokens = localStorage.getItem('Authorization');
    if (AccessTokens) {
      setAccessToken(AccessTokens);
    }
  }, []); 

  const handleImageChange = (e, setImageState) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImageState(event.target.result);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  async function sendProductHandler(event) {

    const currentDate = new Date().toISOString().split('T')[0]; // 현재 날짜
    // const currentTime = new Date().toISOString().split('T')[1].split('.')[0]; // 현재 시간
    const currentDateTime = `${currentDate}`; // 현재 날짜와 시간을 합침시간 : ${currentTime}
    setCreatedAt(currentDateTime);

    event.preventDefault();
    try {
      const productDetails = {
        product_name: productName,
        price: parseInt(price),
        // image_product: images1, // 이미지 하나 더 추가 , base64
        // image_real: images2,
        // create_at: createdAt,
        // expire_at: expireAt, // 만료 일자 추가
        category_id: parseInt(categoryId),
      };
      console.log(productDetails);

    await sendProductData(productDetails, accessToken);
      setProductName('');
      setPrice('');
      setCategoryId('');
      // setImages1();
      // setImages2();
      // setCreatedAt('');
      const redirectUrl = "http://localhost:3000"; // 리다이렉트할 URL을 원하는 경로로 수정해주세요.
      window.location.href = redirectUrl;
  } 
  catch (error) {
    console.error('에러 발생:', error);
  }
}

  return (
    <>
      <section className={styles.formContainer}>
        <form onSubmit={sendProductHandler}>
          <div>
            <label htmlFor='productname' className={styles.label}>상품명</label>
            <input
              className={styles.inputField}
              type='text'
              id='productname'
              required
              value={productName}
              onChange={(event) => setProductName(event.target.value)}
            />
          </div>
          <div>
            <label htmlFor='price' className={styles.label}>가격</label>
            <input
              className={styles.inputField}
              type='int'
              id='price'
              required
              value={price}
              onChange={(event) => setPrice(event.target.value)}
            />
          </div>
          {/* <div>
            <label htmlFor='expire' className={styles.label}>만료 기간</label>
            <input
              className={styles.inputField}
              type='text'
              id='expire'
              required
              pattern="\d{4}-\d{2}-\d{2}"
              placeholder="YYYY-MM-DD 형식으로 입력해주세요"
              value={expireAt}
              onChange={(event) => setexpireAt(event.target.value)}
            />
          </div> */}
          {/* <div>
            <label htmlFor='images1' className={styles.label}>상품 노출 이미지</label>
            <input
              className={styles.inputField}
              type='file'
              id='images1'
              onChange={(event) => handleImageChange(event, setImages1)}
            />
          </div>
          <div>
            <label htmlFor='images2' className={styles.label}>상품 보관 이미지</label>
            <input
              className={styles.inputField}
              type='file'
              id='images2'
              onChange={(event) => handleImageChange(event, setImages2)}
            />
          </div> */}
          <div>
            <label htmlFor='categoryId' className={styles.label}>상품 카테고리</label>
            <input
              className={styles.inputField}
              type='int'
              id='categoryId'
              required
              value={categoryId}
              onChange={(event) => setCategoryId(event.target.value)}
            />
          </div>
          <button className={styles.button}><BsSendFill /></button>
        </form>
      </section>

    </>
  );
}