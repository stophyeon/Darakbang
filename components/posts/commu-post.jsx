import PostsGrid from './posts-grid';

import styles from './commu-post.module.css'

export default function CommuPosts(props) {
  return (
    <section className={styles.section}>
      <PostsGrid posts={props.posts} />
    </section>
  );
}

