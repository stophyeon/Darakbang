import PostsGrid from './posts-grid';

export default function CommuPosts(props) {
  return (
    <section>
      <PostsGrid posts={props.posts} />
    </section>
  );
}

