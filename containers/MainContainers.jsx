'use client';
import MainNavigation from "@compoents/components/layout/main-navigation";
import { MdPostAdd } from "react-icons/md";
import Link from "next/link";
import MiniCategoryComponents from '@compoents/components/minicategory/Minicategory';
import CategoryComponents from '@compoents/components/minicategory/Category';
import Pagination from '@compoents/components/pagination/Paginations';

import styles from "./MainContainers.module.css";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import CommuPosts from '@compoents/components/posts/commu-post';

export default function MainContainers({ postdata }) {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const PAGE_GROUP_SIZE = 3;
  

  
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
            <CategoryComponents handleCategoryChange={handleCategoryChange} />
            <MiniCategoryComponents className={styles.cateminibtn} selectedCategory={selectedCategory} onCategoryChange={handleCategoryChange}/>
          </div>
          <CommuPosts posts={postdata} selectedCategory={selectedCategory} />
          <Pagination 
            currentPage={currentPage}
            posts={postdata}
            PAGE_GROUP_SIZE={PAGE_GROUP_SIZE}
            handlePageChange={handlePageChange}
            goToPreviousPageGroup={goToPreviousPageGroup}
            goToNextPageGroup={goToNextPageGroup}
          />
        </section>
      </div>
    </>
  );
}
