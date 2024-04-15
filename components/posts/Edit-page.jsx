'use client';

import { useState, useEffect } from 'react';

import { PutPostData } from '@compoents/util/post-util';
import styles from './Edit-page.module.css';
import LoadingIndicator from '../UI/LoadingIndicator';

export default function EditProductForm({ productId, post }) {
    const posts = post.product;
    const [accessToken, setAccessToken] = useState('');
    const [productName, setProductName] = useState('');
    const [price, setPrice] = useState(null);
    const [images1, setImages1] = useState('');
    const [showimages1, setShowImages1] = useState('');
    const [images2, setImages2] = useState('');
    const [showimages2, setShowImages2] = useState('');
    const [expireAt, setexpireAt] = useState(null);
    const [createAt, setCreatedAt] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        console.log(post)
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
            setCreatedAt(posts.createAt);
            setLoading(false);
        }
    }, [posts]);

    const handleImageChange = (e) => {
        const selectedImage = e.target.files[0];
        setImages1(selectedImage);
        const imageUrls = URL.createObjectURL(selectedImage);
        setShowImages1(imageUrls);
    };

    const handleImageChanges = (e) => {
        const selectedImage = e.target.files[0];
        setImages2(selectedImage);
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
            const productData = {                   // 아직 formData 형식으로 푸시안됨
                product_name: productName,
                price: parseInt(price),
                image_product: images1, // 이미지 하나 더 추가 , base64
                image_real: images2,
                create_at: createAt,
                expire_at: expireAt,
                category_id: parseInt(categoryId),
            };
            console.log(productData);

            await handleSubmit(productData); 
            const redirectUrl = "http://localhost:3000"; // 리다이렉트할 URL을 원하는 경로로 수정해주세요.
            window.location.href = redirectUrl;
        } catch (error) {
            console.error('에러 발생:', error);
            alert('죄송합니다. 요청을 처리하는 동안 오류가 발생했습니다. 나중에 다시 시도해주세요.');
        }
    }



    return (
        <>
            {loading ? ( // 로딩 중인 경우에만 로딩 스피너를 표시
                <LoadingIndicator />
            ) : (
                <>
                    <section className={styles.formContainer}>
                        <form onSubmit={sendProductHandler}>
                            <div>이미지 수정은 상품 수정에서 불가능합니다. 삭제 후 다시 등록해주세요.</div>
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
                                    value={productName === null ? '' : productName}
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
                                    value={price === null ? '' : price}
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
                                    value={expireAt === null ? '' : expireAt}
                                    onChange={(event) => setexpireAt(event.target.value)}
                                />
                            </div>
                            <button className={styles.button}>등록</button>
                        </form>
                    </section>
                </>
            )}
        </>
    );
}
