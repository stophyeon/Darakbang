
import { Popover, PopoverTrigger, PopoverContent, Button } from '@nextui-org/react';
import styles from './Minicategory.module.css';

export default function MiniCategoryComponents({ selectedCategory, onCategoryChange }) {
  const handleCategoryChange = (categoryId) => {
    onCategoryChange(categoryId);
    console.log(categoryId)
  };

  return (
    <Popover placement="bottom" showArrow={true}>
      <PopoverTrigger>
        <Button className={styles.none}>필터</Button>
      </PopoverTrigger>
      <PopoverContent className={styles.PopContents}>
        <form className={styles.categoryForm}>
          <div className={styles.categoryContainer}>
            <div className={styles.cateMg}>
              <input
                type="checkbox"
                id="3001"
                className={styles.Checkboxes}
                onChange={handleCategoryChange}
                checked={selectedCategory === 3001}
              />
              <p className={styles.cateTexts}>커피 식 음료</p>
            </div>
            <div className={styles.cateMg}>
              <input
                type="checkbox"
                id="3002"
                className={styles.Checkboxes}
                onChange={handleCategoryChange}
                checked={selectedCategory === 3002}
              />
              <p className={styles.cateTexts}>영화 관람권</p>
            </div>
            <div className={styles.cateMg}>
              <input
                type="checkbox"
                id="3003"
                className={styles.Checkboxes}
                onChange={handleCategoryChange}
                checked={selectedCategory === 3003}
              />
              <p className={styles.cateTexts}>공연 관람권</p>
            </div>
            <div className={styles.cateMg}>
              <input
                type="checkbox"
                id="3004"
                className={styles.Checkboxes}
                onChange={handleCategoryChange}
                checked={selectedCategory === 3004}
              />
              <p className={styles.cateTexts}>숙박권</p>
            </div>
            <div className={styles.cateMg}>
              <input
                type="checkbox"
                id="3005"
                className={styles.Checkboxes}
                onChange={handleCategoryChange}
                checked={selectedCategory === 3005}
              />
              <p className={styles.cateTexts}>상품권</p>
            </div>
            <div className={styles.cateMg}>
              <input
                type="checkbox"
                id="3006"
                className={styles.Checkboxes}
                onChange={handleCategoryChange}
                checked={selectedCategory === 3006}
              />
              <p className={styles.cateTexts}>기타</p>
            </div>
          </div>
        </form>
      </PopoverContent>
    </Popover>
  );
}
