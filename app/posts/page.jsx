'use client'
import Head from 'next/head';
import Link from 'next/link';
import { Fragment, useState, useEffect } from 'react';

import CommuPosts from '../../components/posts/commu-post';

export default function CommuPostsPage() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:6080/product/list');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  return (
    <Fragment>
      <Head>
        <title>상품 게시물</title>
        <meta
          name='description'
          content='A list of all programming-related tutorials and posts!'
        />
      </Head>
      <Link href="/posts/newpost">
      <button>게시글 작성</button>
      </Link>
      <CommuPosts posts={posts} />
    </Fragment>
  );
}
