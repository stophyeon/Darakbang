import PostItem from './post-item';
import styles from './posts-grid.module.css';

export default function PostsGrid(props) {
  const { posts, selectedCategory, accessToken } = props;

  if (!posts || !posts.content) {
    return null;
  }

  let filteredPosts = [];
  if (selectedCategory && selectedCategory.length > 0) {
    filteredPosts = posts.content.filter(post => selectedCategory.includes(post.category_id));
  } else {
    filteredPosts = posts.content;
  }

  return (
    <ul className={styles.postsGrid}>
      {filteredPosts.map((post) => (
        <PostItem key={post.product_id} post={post} posts={posts} accessToken={accessToken}/>
      ))}
    </ul>
  );
}