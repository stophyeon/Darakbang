import styles from './LoadingIndicator.module.css';

export default function LoadingIndicator() {
  return (
    <div className={styles.loadingIndicatorContainer}>
      <div className={styles.loadingIndicatorItem}></div>
      <div className={styles.loadingIndicatorItem}></div>
      <div className={styles.loadingIndicatorItem}></div>
      <div className={styles.loadingIndicatorItem}></div>
    </div>
  );
}
