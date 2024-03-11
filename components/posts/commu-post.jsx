import PostsGrid from './posts-grid';

export default function CommuPosts(props) {
  return (
    <section>
      <h1>All Posts</h1>
      <PostsGrid posts={props.posts} />
    </section>
  );
}

