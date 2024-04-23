import PostItem from './post-item';
import styles from './posts-grid.module.css';

export default function PostsGrid(props) {
  const { posts, selectedCategory } = props;

  if (!posts || !posts.content) {
    return null;
  }

  const filteredPosts = posts && posts.content ? (selectedCategory ? posts.content.filter(post => post.category_id === selectedCategory) : posts.content) : [];

  return (
    <ul className={styles.postsGrid}>
      {filteredPosts.map((post) => (
        <PostItem key={post.product_id} post={post} posts={posts} />
      ))}
    </ul>
  );
}



// import PostItem from './post-item';

// import styles from './posts-grid.module.css'

// export default function PostsGrid(props) {

//   const { posts, accessToken } = props;

//   return (
//     <ul className={styles.postsGrid}>
//         {posts && posts.content && posts.content.map((post) => (
//         <PostItem key={post.product_id} post={post} posts={posts} accessToken={accessToken}/>
//       ))}
//     </ul>
//   );
// }
