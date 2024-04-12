'use client';
import { getPostsFile } from '@compoents/util/post-util';
import MainNavigation from "@compoents/components/layout/main-navigation";
import { MdPostAdd } from "react-icons/md";
import Link from "next/link";
import MiniCategoryComponents from '@compoents/components/minicategory/Minicategory';

import styles from "./page.module.css";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import CommuPosts from '@compoents/components/posts/commu-post';

export default function Home() {
  const router = useRouter();
  const [accessToken, setAccessToken] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [posts, setPosts] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const PAGE_GROUP_SIZE = 3;
  
  useEffect(() => {
    const accessTokenFromLocalStorage = localStorage.getItem('Authorization');
    if (accessTokenFromLocalStorage) {
      setAccessToken(accessTokenFromLocalStorage);
    }
  
    const fetchPosts = async () => {
      const postdata = await getPostsFile(accessToken);
      if (postdata && postdata.pageable && postdata.pageable.pageNumber !== undefined) {
        setPosts(postdata);
        setCurrentPage(postdata.pageable.pageNumber + 1);
      } else {
        setPosts(null); 
      }
    }
    fetchPosts()
  }, [accessToken]);

  
  const handlePageChange = (page) => {
    router.push(`/${page}`);
  }
  const goToPreviousPageGroup = () => {
    setCurrentPage((prev) => prev - PAGE_GROUP_SIZE);
  }
  const goToNextPageGroup = () => {
    setCurrentPage((prev) => prev + PAGE_GROUP_SIZE);
  }

    const handleCategoryChange = (e) => {
      const categoryId = parseInt(e.target.id);
      setSelectedCategory(prevCategory => prevCategory === categoryId ? null : categoryId);
    };
  

  return (
    <>
      <MainNavigation />
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
              <div className={styles.categoryContainer}>
                <div className={styles.cateMg}>
                  <input
                    type='checkbox'
                    id='3001'
                    className={styles.Checkboxes}
                    onChange={handleCategoryChange}
                  />
                  <p className={styles.cateTexts}>커피 식 음료</p>
                </div>
                <div className={styles.cateMg}>
                  <input
                    type='checkbox'
                    id='3002'
                    className={styles.Checkboxes}
                    onChange={handleCategoryChange}
                  />
                  <p className={styles.cateTexts}>영화 관람권</p>
                </div>
                <div className={styles.cateMg}>
                  <input
                    type='checkbox'
                    id='3003'
                    className={styles.Checkboxes}
                    onChange={handleCategoryChange}
                  />
                  <p className={styles.cateTexts}>공연 관람권</p>
                </div>
                <div className={styles.cateMg}>
                  <input
                    type='checkbox'
                    id='3004'
                    className={styles.Checkboxes}
                    onChange={handleCategoryChange}
                  />
                  <p className={styles.cateTexts}>숙박권</p>
                </div>
                <div className={styles.cateMg}>
                  <input
                    type='checkbox'
                    id='3005'
                    className={styles.Checkboxes}
                    onChange={handleCategoryChange}
                  />
                  <p className={styles.cateTexts}>상품권</p>
                </div>
                <div className={styles.cateMg}>
                  <input
                    type='checkbox'
                    id='3006'
                    className={styles.Checkboxes}
                    onChange={handleCategoryChange}
                  />
                  <p className={styles.cateTexts}>기타</p>
                </div>
              </div>
            </form>
            <MiniCategoryComponents className={styles.cateminibtn} selectedCategory={selectedCategory} onCategoryChange={handleCategoryChange}/>
          </div>
          <CommuPosts posts={posts} accessToken={accessToken} selectedCategory={selectedCategory} />

          <div className={styles.pagination}>
            {posts && posts.totalPages && currentPage > 1 && (
              <button onClick={goToPreviousPageGroup}><Image src={'/Polygon2.svg'} alt="" width={26} height={26} className={styles.before} /></button>
            )}
            {posts && posts.totalPages && Array.from({ length: Math.min(PAGE_GROUP_SIZE, posts.totalPages - currentPage + 1) }, (_, index) => (
              <button key={currentPage + index} onClick={() => handlePageChange(currentPage + index)} className={styles.pagebtn}>
                {currentPage + index}
              </button>
            ))}
            {posts && posts.totalPages && currentPage + PAGE_GROUP_SIZE <= posts.totalPages && (
              <button onClick={goToNextPageGroup}><Image src={'/Polygon3.svg'} alt="" width={26} height={26} /></button>
            )}
          </div>
        </section>
      </div>
    </>
  );
}
