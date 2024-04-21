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
  const [images1, setImages1] = useState('/images/SendDfImg.png');
  const [showimages1, setShowImages1] = useState('/images/SendDfImg.png');
  const [images2, setImages2] = useState('/images/bkimg.png');
  const [showimages2, setShowImages2] = useState('/images/bkimg.png');
  const [createdAt, setCreatedAt] = useState('');
  const [expireAt, setexpireAt] = useState('');
  const [categoryId, setCategoryId] = useState('음료');
  const [accessToken, setAccessToken] = useState('');

  const selectList = [
    { value: "3001", name: "음료" },
    { value: "3002", name: "음식" },
    { value: "3003", name: "영화 관람권" },
    { value: "3004", name: "모바일 교환권" },
    { value: "3005", name: "상품권" },
    { value: "3006", name: "기타" },
  ];

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
    const imageUrls = URL.createObjectURL(selectedImage);
    setShowImages1(imageUrls);
  };

  const handleImageChanges = (e) => {
    const selectedImage = e.target.files[0];
    const imageUrl = (selectedImage);
    setImages2(imageUrl);
    const imageUrls = URL.createObjectURL(selectedImage);
    setShowImages2(imageUrls);
  };

  const handleSelect = (e) => {
    setCategoryId(e.target.selectedOptions[0].value);
  };


  async function sendProductHandler(event) {

    const currentDate = new Date().toISOString().split('T')[0]; // 현재 날짜
    setCreatedAt(currentDate);
    console.log(currentDate)

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
      let req = {
        "product_name": productName,
        "price": parseInt(price),
        "category_id": parseInt(categoryId),
        "create_at": createdAt,
        "expire_at": expireAt,
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
        <form onSubmit={sendProductHandler} className={styles.minis}>
          
          <div className={styles.minis}>
            <label className={styles.imglabel}>등록 이미지</label>
            <label htmlFor='images1' className={styles.label}>
              <Image src={showimages1} alt="상품 이미지" width="760" height="760" className={styles.selectImg} />
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
          <div className={styles.NotEditImg}>이미지는 상품 등록 시 수정 불가합니다.</div>
          <div className={styles.margins}>
            <label className={styles.label}>카테고리</label>
            <select
              className={styles.inputField}
              id='categoryId'
              value={categoryId} // option value 값이 담기게
              onChange={handleSelect}
            >
              {selectList.map((item) => (
                <option value={item.value} key={item.value}>
                  {item.name}
                </option>
              ))}

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
          <div className={styles.margins}>
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
          </div>
          <div className={styles.margins}>
            <label className={styles.label}>실제 이미지 (바코드)</label>
            <label htmlFor='images2' className={styles.label}>
              <Image src={showimages2} alt="프로필 이미지" width="350" height="55" className={styles.bkImg} />
            </label>
            <input
              className={styles.inputFields}
              type='int'
              id='price'
              required
              value={price}
              disabled
              onChange={(event) => setPrice(event.target.value)}
            />
            <input
              className={styles.inputField}
              type='file'
              id='images2'
              placeholder='바코드가 나온 사진을 등록하세요.'
              accept="image/*"
              style={{ display: "none" }}
              onChange={(e) => handleImageChanges(e)}
            />
          </div>
          <button className={styles.button}>등록</button>
        </form>
      </section>
    </>
  );
}
