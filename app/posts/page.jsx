import Head from 'next/head';
import { Fragment } from 'react';

import CommuPosts from '../../components/posts/commu-post';

export default function CommuPostsPage(props) {
  return (
    <Fragment>
      <Head>
        <title>상품 게시물</title>
        <meta
          name='게시물'
          content='A list of all programming-related tutorials and posts!'
        />
      </Head>
      <CommuPosts posts={props.posts} />
    </Fragment>
  );
}

// export function getStaticProps() {
//   const allPosts = getAllPosts();

//   return {
//     props: {
//       posts: allPosts,
//     },
//   };
// }

const getPost = async () => {
    const response = await fetch ('http://localhost:6080/product/list')
    if (!response.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error('Failed to fetch data')
      }
    const allPosts = response.json();
    return {
        props: {
            posts: allPosts,
        }
    }
}
