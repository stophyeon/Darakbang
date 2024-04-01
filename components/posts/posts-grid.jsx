import PostItem from './post-item';

import styles from './posts-grid.module.css'

export default function PostsGrid(props) {

  const { posts } = props;

  return (
    <ul className={styles.postsGrid}>
        {posts && posts.content.map((post)=> (
        <PostItem key={post.product_id} post={post} posts={posts}/>
      ))}
    </ul>
  );
}