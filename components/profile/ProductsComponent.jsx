import CommuPosts from "../posts/commu-post";
import styles from "./ProductsComponent.module.css";

export default function ProductsComponent({userproducts}){
    return (
        <>
        <section className={styles.section}>
        <CommuPosts posts={userproducts} />
        </section>
        </>
    )
}