import PostItem from './post-item';

import styles from './posts-grid.module.css'

function PostsGrid(props) {
  const { posts } = props;

  return (
    <ul className={styles.postsGrid}>
      {posts && posts.map((post)=> (
        <PostItem key={post.productId} post={post} />
      ))}
    </ul>
  );
}

export default PostsGrid;