import styles from './ErrorBlock.module.css';

export default function ErrorBlock({ title, message }) {
  return (
    <div className={styles.errorBlockContainer}>
      <div className={styles.errorBlockIcon}>!</div>
      <div>
        <h2 className={styles.errorBlockTitle}>{title}</h2>
        <p className={styles.errorBlockMessage}>{message}</p>
      </div>
    </div>
  );
}
