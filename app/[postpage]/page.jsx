
import Link from 'next/link';
import { MdPostAdd } from "react-icons/md";

import { getPostsFiles } from '@compoents/util/post-util';
import CommuPosts from '@compoents/components/posts/commu-post';
import styles from './page.module.css';



export default async function CommuPostsPage({ params }) {
  
  //const postdata = await getPostsFiles(params.postpage, accessToken);
  //const [ posts ] = await Promise.all([postdata]);

  return (
    <div className={styles.pageContainer}>
      <section className={styles.flexSection1}></section>

      <section className={styles.flexSection2}>
      <div className={styles.buttonContainer}>
        <Link href="/newpost">
          <button className={styles.button}><MdPostAdd /></button>
        </Link>
      </div>
      <div className={styles.cateSticky}>
      <div className={styles.categoryTitle}>
        <p className={styles.categoryText}>카테고리</p>
      </div>
      <form className={styles.categoryForm}>
      <div className={styles.anycategory}>
        <div className={styles.cateMg}>
        <input 
        type='checkbox' 
        id='3001'
        className={styles.Checkboxes}
        /> 
        <p className={styles.cateTexts}>커피 식 음료</p>
        </div>
        <div className={styles.cateMg}>
        <input 
        type='checkbox' 
        id='3002'
        className={styles.Checkboxes}
        /> 
        <p className={styles.cateTexts}>영화 관람권</p>
        </div>
        <div className={styles.cateMg}>
        <input 
        type='checkbox' 
        id='3003'
        className={styles.Checkboxes}
        /> 
        <p className={styles.cateTexts}>공연 관람권</p>
        </div>
        <div className={styles.cateMg}>
        <input 
        type='checkbox' 
        id='3004'
        className={styles.Checkboxes}
        /> 
        <p className={styles.cateTexts}>숙박권</p>
        </div>
        <div className={styles.cateMg}>
        <input 
        type='checkbox' 
        id='3005'
        className={styles.Checkboxes}
        /> 
        <p className={styles.cateTexts}>상품권</p>
        </div>
        <div className={styles.cateMg}>
        <input 
        type='checkbox' 
        id='3006'
        className={styles.Checkboxes}
        /> 
        <p className={styles.cateTexts}>기타</p>
        </div>
      </div>
      </form>
      </div>
      {/*<CommuPosts posts={posts} />*/}
      </section>
    </div>
  );
}
