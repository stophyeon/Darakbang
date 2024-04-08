'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

import { PutPostData } from '@compoents/util/post-util';
import styles from './Edit-page.module.css';

export default function EditProductForm({ productId, post }) {
    const posts = post.product;
    const [accessToken, setAccessToken] = useState('');
    const [productName, setProductName] = useState('');
    const [price, setPrice] = useState('');
    const [images1, setImages1] = useState('');
    const [showimages1, setShowImages1] = useState('');
    const [images2, setImages2] = useState('');
    const [showimages2, setShowImages2] = useState('');
    const [expireAt, setexpireAt] = useState(''); //posts.expireAt
    const [categoryId, setCategoryId] = useState('');

    useEffect(() => {

        const storedAccessToken = localStorage.getItem('Authorization');
        if (storedAccessToken) {
            setAccessToken(storedAccessToken);
        }
        if (posts) {
            setProductName(posts.productName);
            setPrice(posts.price);
            setImages1(posts.imageProduct);
            setShowImages1(posts.imageProduct);
            setImages2(posts.imageReal);
            setShowImages2(posts.imageReal);
            setCategoryId(posts.categoryId);
            setexpireAt(posts.expireAt); 
        }
    }, [posts]);

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


    async function handleSubmit(productData) {
        try {
            const response = await PutPostData(productId, productData, accessToken) //formData
        } catch (error) {
            console.error('게시물 수정에 실패했습니다:', error);
            alert('게시물 수정에 실패했습니다.');
        }
    }

    async function sendProductHandler(event) {
        event.preventDefault();

        try {
            // const formData = new FormData();
            // let req = {
            //     "product_name": productName,
            //     "price": parseInt(price),
            //     "category_id": parseInt(categoryId),
            // }
            // formData.append('req', new Blob([JSON.stringify(req)], { type: "application/json" }));
            // formData.append('img_product', images1);
            // formData.append('img_real', images2);
            // for (var pair of formData.values()) {
            //     console.log(pair); 
            //   }
            const productData = {
                product_name: productName,
                price: parseInt(price),
                image_product: images1, // 이미지 하나 더 추가 , base64
                image_real: images2,
                // create_at: createdAt,
                // expire_at: expireAt,
                category_id: parseInt(categoryId),
            };
            console.log(productData);

            await handleSubmit(productData); //formData
            // const redirectUrl = "http://localhost:3000"; // 리다이렉트할 URL을 원하는 경로로 수정해주세요.
            // window.location.href = redirectUrl;
        } catch (error) {
            console.error('에러 발생:', error);
            alert('죄송합니다. 요청을 처리하는 동안 오류가 발생했습니다. 나중에 다시 시도해주세요.');
        }
    }



    return (
        <>
            <section className={styles.formContainer}>
                <form onSubmit={sendProductHandler}>
                    <div>
                        <label className={styles.imglabel}>등록 이미지</label>
                        <label htmlFor='images1' className={styles.label}>
                            <Image src={showimages1} alt="프로필 이미지" width="760" height="760" className={styles.selectImg} />
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
