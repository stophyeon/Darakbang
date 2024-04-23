
import Image from 'next/image';
import styles from "./Paginations.module.css";

export default function Pagination({ currentPage, posts, PAGE_GROUP_SIZE, handlePageChange, goToPreviousPageGroup, goToNextPageGroup }) {
  return (
    <div className={styles.pagination}>
      {posts && posts.totalPages && currentPage > 1 && (
        <button onClick={goToPreviousPageGroup}>
          <Image src={'/svgs/Polygon2.svg'} alt="" width={26} height={26} className={styles.before} />
        </button>
      )}
      {posts && posts.totalPages && Array.from({ length: Math.min(PAGE_GROUP_SIZE, posts.totalPages - currentPage + 1) }, (_, index) => (
        <button key={currentPage + index} onClick={() => handlePageChange(currentPage + index)} className={styles.pagebtn}>
          {currentPage + index}
        </button>
      ))}
      {posts && posts.totalPages && currentPage + PAGE_GROUP_SIZE <= posts.totalPages && (
        <button onClick={goToNextPageGroup}>
          <Image src={'/svgs/Polygon3.svg'} alt="" width={26} height={26} />
        </button>
      )}
    </div>
  );
}
