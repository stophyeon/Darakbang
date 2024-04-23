'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { MdPostAdd } from "react-icons/md";

import { getPostsFiles } from '@compoents/util/post-util';
import MiniCategoryComponents from '@compoents/components/minicategory/Minicategory';
import CommuPosts from '@compoents/components/posts/commu-post';
import Pagination from '@compoents/components/pagination/Paginations';
import CategoryComponents from '@compoents/components/minicategory/Category';
import styles from './NextPageContainers.module.css';




export default function NextPageContainer({ postPage }) {
  const router = useRouter();
  const [accessToken, setAccessToken] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const [posts, setPosts] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const PAGE_GROUP_SIZE = 2;

  useEffect(() => {
    const accessTokenFromLocalStorage = localStorage.getItem('accessToken');
    if (accessTokenFromLocalStorage) {
      setAccessToken(accessTokenFromLocalStorage);
    }

    const fetchPosts = async () => {
      const postdata = await getPostsFiles(postPage, accessToken);
      if (postdata) {
        console.log(postdata);
        setPosts(postdata);
        setCurrentPage(postdata.pageable.pageNumber);
      }
      else {
        alert('게시물안받아옴')
      }
    }
    fetchPosts()
  }, [accessToken]);

  const handlePageChange = (page) => {
    if (page == 1) {
      router.push('/')
    } else {
      router.push(`/${page}`);
    }
  }

  const goToPreviousPageGroup = () => {
    setCurrentPage((prev) => (prev - PAGE_GROUP_SIZE < 1 ? 1 : prev - PAGE_GROUP_SIZE));
  }

  const goToNextPageGroup = () => {
    setCurrentPage((prev) => prev + PAGE_GROUP_SIZE);
  }


  const handleCategoryChange = (e) => {
    const categoryId = parseInt(e.target.id);
    setSelectedCategory(prevCategory => prevCategory === categoryId ? null : categoryId);
  };


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
          <CategoryComponents handleCategoryChange={handleCategoryChange} />
          <MiniCategoryComponents className={styles.cateminibtn} selectedCategory={selectedCategory} onCategoryChange={handleCategoryChange} />
        </div>
        <CommuPosts posts={posts} selectedCategory={selectedCategory}/>
        <Pagination
          currentPage={currentPage}
          posts={posts}
          PAGE_GROUP_SIZE={PAGE_GROUP_SIZE}
          handlePageChange={handlePageChange}
          goToPreviousPageGroup={goToPreviousPageGroup}
          goToNextPageGroup={goToNextPageGroup}
        />
      </section>
    </div>
  );
}
