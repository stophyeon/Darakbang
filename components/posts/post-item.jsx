import Link from 'next/link';
// import Image from 'next/image';

import styles from './post-item.module.css';

function PostItem(props) {
  const { product_name, price, product_id } = props.post;
  const { pageNumber } = props.posts.pageable;

 
  const linkPath = `/${pageNumber}/${product_id}`;

  return (
      <Link href={linkPath} style={{ textDecoration: "none" }}>
        <div className={styles.postItem}>
          {/* 유저 프로필 */}
          <h3>{product_name}</h3>
          {/* 판매 사진 */}
          <h3>가격</h3>
          <h3>{price}원</h3>
          <div>
            <button>좋아요</button> <button>구매하기</button>
          </div>
        </div>
      </Link>
  );
}

export default PostItem;