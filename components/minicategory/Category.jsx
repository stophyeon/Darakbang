
import styles from './Category.module.css';

export default function CategoryComponents({ handleCategoryChange }) {

    return (
        <>
        <div className={styles.categoryTitle}>
              <p className={styles.categoryText}>카테고리</p>
            </div>
        <form className={styles.categoryForm}>
              <div className={styles.categoryContainer}>
                <div className={styles.cateMg}>
                  <input
                    type='checkbox'
                    id='3001'
                    className={styles.Checkboxes}
                    onChange={handleCategoryChange}
                  />
                  <p className={styles.cateTexts}>커피 식 음료</p>
                </div>
                <div className={styles.cateMg}>
                  <input
                    type='checkbox'
                    id='3002'
                    className={styles.Checkboxes}
                    onChange={handleCategoryChange}
                  />
                  <p className={styles.cateTexts}>영화 관람권</p>
                </div>
                <div className={styles.cateMg}>
                  <input
                    type='checkbox'
                    id='3003'
                    className={styles.Checkboxes}
                    onChange={handleCategoryChange}
                  />
                  <p className={styles.cateTexts}>공연 관람권</p>
                </div>
                <div className={styles.cateMg}>
                  <input
                    type='checkbox'
                    id='3004'
                    className={styles.Checkboxes}
                    onChange={handleCategoryChange}
                  />
                  <p className={styles.cateTexts}>숙박권</p>
                </div>
                <div className={styles.cateMg}>
                  <input
                    type='checkbox'
                    id='3005'
                    className={styles.Checkboxes}
                    onChange={handleCategoryChange}
                  />
                  <p className={styles.cateTexts}>상품권</p>
                </div>
                <div className={styles.cateMg}>
                  <input
                    type='checkbox'
                    id='3006'
                    className={styles.Checkboxes}
                    onChange={handleCategoryChange}
                  />
                  <p className={styles.cateTexts}>기타</p>
                </div>
              </div>
            </form>
            </>
    )
}