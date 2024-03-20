import Head from 'next/head';
import Link from 'next/link';
import { Fragment } from 'react';
import { MdPostAdd } from "react-icons/md";

import { getPostsFiles } from '@compoents/util/post-util';
import CommuPosts from '@compoents/components/posts/commu-post';
import styles from './page.module.css';



export default async function CommuPostsPage() {
  const postdata = await getPostsFiles();

  const [posts] = await Promise.all([postdata]);

  return (
    <Fragment>
      <Head>
        <title>상품 게시물</title>
        <meta
          name='description'
          content='상품들'
        />
      </Head>
      <div className={styles.buttonContainer}>
        <Link href="/posts/newpost">
          <button className={styles.button}><MdPostAdd /></button>
        </Link>
      </div>
      <CommuPosts posts={posts} />
    </Fragment>
  );
}
