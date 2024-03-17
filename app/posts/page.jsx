import Head from 'next/head';
import Link from 'next/link';
import { Fragment } from 'react';

import { getPostsFiles } from '@compoents/util/post-util';
import CommuPosts from '@compoents/components/posts/commu-post';


export default async function CommuPostsPage() {
  const postdata = await getPostsFiles();

  const [ posts ] = await Promise.all([postdata]);

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
