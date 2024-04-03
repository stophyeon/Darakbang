'use client';
import { getPostsFile } from '@compoents/util/post-util';
import MainNavigation from "@compoents/components/layout/main-navigation";
import Link from "next/link";

import styles from "./page.module.css";

import { useState, useEffect } from 'react';
import CommuPosts from '@compoents/components/posts/commu-post';

export default function Home() {
  // localstorage에서 accessToken 꺼내오는 로직
  const [accessToken, setAccessToken] = useState('');
  const [posts, setPosts] = useState('');

  useEffect(() => {
    const accessTokenFromLocalStorage = localStorage.getItem('accessToken');
    if (accessTokenFromLocalStorage) {
      setAccessToken(accessTokenFromLocalStorage);
    }

    const fetchPosts = async () => {
          const postdata = await getPostsFile(accessToken);
          if (postdata){
            console.log(postdata);
            setPosts(postdata);
          }
          else {
            alert('게시물안받아옴')
          }
        }
    fetchPosts()
  }, [accessToken]); 

  

  return (
    <>
      <MainNavigation/>
      <section className={styles.flexSection1}></section>
      <div className={styles.buttonContainer}>
        <Link href="/newpost">
          <button className={styles.button}>글쓰기</button>
        </Link>
      </div>
      <CommuPosts posts={posts} />
    </>
  );
}
