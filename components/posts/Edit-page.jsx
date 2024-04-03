'use client';

import { useState, useEffect } from 'react';

import { fetchUserProfile } from '@compoents/util/http';
import { PutPostData } from '@compoents/util/post-util';
import styles from './Edit-page.module.css';

export default function EditProductForm({ productId }) {
    const [userInfo, setUserInfo] = useState('');
    const [productName, setProductName] = useState('');
    const [price, setPrice] = useState('');
    const [images1, setImages1] = useState();
    const [images2, setImages2] = useState();
    const [createdAt, setCreatedAt] = useState('');
    const [expireAt, setexpireAt] = useState('');
    const [soldOut, setSoldOut] = useState(false);
    const [categoryId, setCategoryId] = useState('');

    useEffect(() => {

        const fetchUserProfileData = async () => {
            try {
                const data = await fetchUserProfile(accessToken);
                setUserInfo(data);
            } catch (error) {
                console.error('pf error', error);
            }
        };
        fetchUserProfileData();

        const currentDate = new Date().toISOString().split('T')[0]; // 현재 날짜
        const currentTime = new Date().toISOString().split('T')[1].split('.')[0]; // 현재 시간
        const currentDateTime = `${currentDate}T${currentTime}`; // 현재 날짜와 시간을 합침
        setCreatedAt(currentDateTime);
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

    async function handleSubmit(productData) {
        console.log(productId)
        try {
            const response = await PutPostData(productId, productData, accessToken)
        } catch (error) {
            console.error('게시물 수정에 실패했습니다:', error);
            alert('게시물 수정에 실패했습니다.');
        }
    }

    async function sendProductHandler(event) {
        event.preventDefault();

        try {
            const productData = {
                product_name: productName,
                price: parseInt(price),
                image_product: images1, // 이미지 하나 더 추가 , base64
                image_real: images2,
                create_at: createdAt,
                sold_out: soldOut,
                expire_at: expireAt,
                category_id: parseInt(categoryId),
                product_detail: bodyMessage,
                nick_name: userInfo.nick_name,
            };
            console.log(productData);

            await handleSubmit(productData, accessToken);
            setRequestStatus('success');
            setProductName('');
            setPrice('');
            setImages1();
            setImages2();
            setCreatedAt('');
            setSoldOut(false);
            setCategoryId('');
            setUserInfo('');
        } catch (error) {
            console.error('에러 발생:', error);
            alert('죄송합니다. 요청을 처리하는 동안 오류가 발생했습니다. 나중에 다시 시도해주세요.');
        }
    }



    return (
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
                <div>
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
                <button className={styles.button}>게시물 수정</button>
            </form>
        </section>
    );
}
