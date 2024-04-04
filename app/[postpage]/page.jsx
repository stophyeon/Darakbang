'use client';
import Link from 'next/link';
import { MdPostAdd } from "react-icons/md";

import { getPostsFiles } from '@compoents/util/post-util';
import CommuPosts from '@compoents/components/posts/commu-post';
import styles from './page.module.css';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';



export default function CommuPostsPage({ params }) {
  const router = useRouter();
  const [accessToken, setAccessToken] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const [posts, setPosts] = useState('');
  const PAGE_GROUP_SIZE = 5;

  useEffect(() => {
    const accessTokenFromLocalStorage = localStorage.getItem('accessToken');
    if (accessTokenFromLocalStorage) {
      setAccessToken(accessTokenFromLocalStorage);
    }

    const fetchPosts = async () => {
      const postdata = await getPostsFiles(params.postpage, accessToken);
      if (postdata) {
        console.log(postdata);
        setPosts(postdata);
        setCurrentPage(postdata.pageable.pageNumber + 1);
      }
      else {
        alert('게시물안받아옴')
      }
    }
    fetchPosts()
  }, [accessToken]);

  const handlePageChange = (page) => {
    router.push(`/${page}`);
  }

  const goToPreviousPageGroup = () => {
    setCurrentPage((prev) => (prev - PAGE_GROUP_SIZE < 1 ? 1 : prev - PAGE_GROUP_SIZE));
  }
  
  const goToNextPageGroup = () => {
    setCurrentPage((prev) => prev + PAGE_GROUP_SIZE);
  }


  return (
    <div className={styles.pageContainer}>
      <section className={styles.flexSection1}></section>

      <section className={styles.flexSection2}>
        <div className={styles.buttonContainer}>
          <Link href="/newpost">
            <button className={styles.button}><MdPostAdd /></button>
          </Link>
        </div>
        <div className={styles.cateSticky}>
          <div className={styles.categoryTitle}>
            <p className={styles.categoryText}>카테고리</p>
          </div>
          <form className={styles.categoryForm}>
            <div className={styles.anycategory}>
              <div className={styles.cateMg}>
                <input
                  type='checkbox'
                  id='3001'
                  className={styles.Checkboxes}
                />
                <p className={styles.cateTexts}>커피 식 음료</p>
              </div>
              <div className={styles.cateMg}>
                <input
                  type='checkbox'
                  id='3002'
                  className={styles.Checkboxes}
                />
                <p className={styles.cateTexts}>영화 관람권</p>
              </div>
              <div className={styles.cateMg}>
                <input
                  type='checkbox'
                  id='3003'
                  className={styles.Checkboxes}
                />
                <p className={styles.cateTexts}>공연 관람권</p>
              </div>
              <div className={styles.cateMg}>
                <input
                  type='checkbox'
                  id='3004'
                  className={styles.Checkboxes}
                />
                <p className={styles.cateTexts}>숙박권</p>
              </div>
              <div className={styles.cateMg}>
                <input
                  type='checkbox'
                  id='3005'
                  className={styles.Checkboxes}
                />
                <p className={styles.cateTexts}>상품권</p>
              </div>
              <div className={styles.cateMg}>
                <input
                  type='checkbox'
                  id='3006'
                  className={styles.Checkboxes}
                />
                <p className={styles.cateTexts}>기타</p>
              </div>
            </div>
          </form>
        </div>
        <CommuPosts posts={posts} />
        <div className={styles.pagination}>
          {currentPage > 1 && (
            <button onClick={goToPreviousPageGroup}>이전</button>
          )}
          {Array.from({ length: Math.min(PAGE_GROUP_SIZE, posts.totalPages - currentPage + 1) }, (_, index) => (
            <button key={currentPage + index} onClick={() => handlePageChange(currentPage + index)} className={styles.pagebtn}>
              {currentPage + index}
            </button>
          ))}
          {currentPage + PAGE_GROUP_SIZE <= posts.totalPages && (
            <button onClick={goToNextPageGroup}>다음</button>
          )}
        </div>
      </section>
    </div>
  );
}
