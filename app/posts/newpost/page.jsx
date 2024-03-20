'use client';
import { useState, useEffect } from 'react';
import styles from './page.module.css';

async function sendProductData(productDetails) {
  try {
    const response = await fetch('http://localhost:6080/product/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(productDetails),
    });

    if (response.status !== 201) {
      throw new Error('상품을 게시하는데 문제가 발생했습니다.');
    } else {
      <h2>상품 게시 완료!</h2>
    }


  } catch (error) {
    throw new Error(error.message || '상품을 게시하는데 문제가 발생했습니다.');
  }
}


export default function ProductForm() {
  const [productName, setProductName] = useState('');
  const [price, setPrice] = useState('');
  const [images, setImages] = useState([]);
  const [createdAt, setCreatedAt] = useState('');
  const [jwt, setJwt] = useState('');
  const [soldOut, setSoldOut] = useState(false);
  const [categoryId, setCategoryId] = useState('');
  const [bodyMessage, setbodyMessage] = useState('');
  const [requestStatus, setRequestStatus] = useState(); // 'pending', 'success', 'error'
  const [requestError, setRequestError] = useState('');

  useEffect(() => {
    // 로컬스토리지에서 jwt 가져오기
    const jwt = localStorage.getItem("Authorization");
    if (!jwt) {
      alert("로그인이 필요합니다. 로그인 창으로 이동합니다.");
      window.location.href = "/login";
      return;
    }
    setJwt(jwt);
  }, []);

  async function sendProductHandler(event) {
    event.preventDefault();

    setRequestStatus('pending');

    try {
      const productDetails = {
        productname: productName,
        price: parseInt(price),
        image: images,
        createat: createdAt,
        soldout: soldOut,
        categoryid: parseInt(categoryId),
        jwt: jwt,
        pmessage: bodyMessage,
      };
      console.log(productDetails);

      await sendProductData(productDetails);
      setRequestStatus('success');
      setProductName('');
      setPrice('');
      setImages([]);
      setCreatedAt('');
      setSoldOut(false);
      setCategoryId('');
    } catch (error) {
      setRequestError(error.message);
      setRequestStatus('error');
    }
  }

  let notification;

  if (requestStatus === 'pending') {
    notification = {
      status: 'pending',
      title: '게시물 전송 중...',
      message: '게시물을 전송 중입니다!',
    };
  }

  if (requestStatus === 'success') {
    window.location.href = '/posts';
  }

  if (requestStatus === 'error') {
    notification = {
      status: 'error',
      title: '오류!',
      message: requestError,
    };
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
        <div>
          <label htmlFor='image' className={styles.label}>이미지 (최대 5장)</label>
          <input
            className={styles.inputField}
            type='file'
            id='image'
            multiple
            onChange={(event) => setImages(Array.from(event.target.files))}
          />
        </div>
        <div>
          <label htmlFor='createat' className={styles.label}>올린 날짜</label>
          <input
          className={styles.selectField}
            type='date'
            id='createat'
            required
            value={createdAt}
            onChange={(event) => setCreatedAt(event.target.value)}
          />
        </div>
        <div>
          <label htmlFor='soldout' className={styles.label}>상품 판매 여부</label>
          <select
          className={styles.selectField}
            id='soldout'
            value={soldOut}
            onChange={(event) => setSoldOut(event.target.value === 'true')}
          >
            <option value='false'>판매 중</option>
            <option value='true'>품절</option>
          </select>
        </div>
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
        <div>
          <label htmlFor='bodyMessage' className={styles.label}></label>
          <input
            className={styles.inputFielded}
            type='string'
            id='bodyMessage'
            required
            value={bodyMessage}
            onChange={(event) => setbodyMessage(event.target.value)}
          />
        </div>
        <button className={styles.button}>게시물 전송</button>
      </form>
      {notification && (
      <div className={`${styles.notification} ${styles[notification.status]}`}>
        <h2 className={styles.notificationTitle}>{notification.title}</h2>
        <p className={styles.notificationMessage}>{notification.message}</p>
      </div>
    )}
    </section>
    
    </>
  );
}
