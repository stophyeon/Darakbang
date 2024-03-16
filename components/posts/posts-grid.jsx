import PostItem from './post-item';

function PostsGrid(props) {
  const { posts } = props;

  return (
    <ul>
      {posts && posts.map((post)=> (
        <PostItem key={post.productId} post={post} />
      ))}
    </ul>
  );
}

export default PostsGrid;