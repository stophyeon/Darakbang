'use client'
import Head from 'next/head';
import Link from 'next/link';
import { Fragment, useState, useEffect } from 'react';

import { getPostsFiles } from '@compoents/util/post-util';
import CommuPosts from '@compoents/components/posts/commu-post';

export default function CommuPostsPage() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getPostsFiles();
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
          content='상품들'
        />
      </Head>
      <Link href="/posts/newpost">
      <button>게시글 작성</button>
      </Link>
      <CommuPosts posts={posts} />
    </Fragment>
  );
}
