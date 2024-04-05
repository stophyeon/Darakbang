'use client';
import { useState, useEffect } from 'react';
import styles from './SendPost.module.css';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

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
  const [images1, setImages1] = useState('/SendDfImg.png');
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

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    const imageUrl = (selectedImage);
    setImages1(imageUrl);
    console.log(imageUrl);
  };

  const handleImageChanges = (e) => {
    const selectedImage = e.target.files[0];
    const imageUrl = (selectedImage);
    setImages2(imageUrl);
    console.log(imageUrl);
  };

  async function sendProductHandler(event) {

    const currentDate = new Date().toISOString().split('T')[0]; // 현재 날짜
    // const currentTime = new Date().toISOString().split('T')[1].split('.')[0]; // 현재 시간
    const currentDateTime = `${currentDate}`; // 현재 날짜와 시간을 합침시간 : ${currentTime}
    setCreatedAt(currentDateTime);

    event.preventDefault();
    try {
      // const productDetails = {
      //   product_name: productName,
      //   price: parseInt(price),
      //   // image_product: images1, // 이미지 하나 더 추가 , base64
      //   // image_real: images2,
      //   // create_at: createdAt,
      //   // expire_at: expireAt, // 만료 일자 추가
      //   category_id: parseInt(categoryId),
      // };
      // console.log(productDetails);

      const formData = new FormData();
    let req ={
      "product_name": productName,
      "price": parseInt(price),
      "category_id": parseInt(categoryId),
    }
    formData.append('req', new Blob([JSON.stringify(req)], { type: "application/json" }));
    formData.append('img_product', images1);
    formData.append('img_real', images2);
    for (var pair of formData.values()) {
      console.log(pair); 
    }
    

      await sendProductData(formData, accessToken); //productDetails
      // setProductName('');
      // setPrice('');
      // setCategoryId('');
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
          <label className={styles.imglabel}>등록 이미지</label>
            <label htmlFor='images1' className={styles.label}>
            <img src={images1} alt="프로필 이미지" width="760" height="760" className={styles.selectImg} />
            </label>
            <input
              className={styles.inputField}
              type='file'
              id='images1'
              accept="image/*"
              style={{ display: "none" }}
              onChange={(e) => handleImageChange(e)}
            />
          </div>
          <div className={styles.margins}>
            <label htmlFor='categoryId' className={styles.label}>카테고리</label>
            <select
              className={styles.inputField}
              id='categoryId'
              required
              value={categoryId}
              onChange={(event) => setCategoryId(event.target.value)}
            >
              <option value="3001">음료</option>
              <option value="3002">음식</option>
              <option value="3003">영화 관람권</option>
              <option value="3004">모바일 교환권</option>
              <option value="3005">상품권</option>
              <option value="3006">기타</option>
            </select>
          </div>
          <div className={styles.margins}>
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
          <div className={styles.margins}>
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
          {/* <div className={styles.margins}>
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
          </div>  */}
          <div className={styles.margins}>
            <label htmlFor='images2' className={styles.label}>실제 이미지 (바코드)</label>
            <input
              className={styles.inputField}
              type='file'
              id='images2'
              onChange={(e) => handleImageChanges(e)}
            />
          </div>

          <button className={styles.button}>등록</button>
        </form>
      </section>

    </>
  );
}
