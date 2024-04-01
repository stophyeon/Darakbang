import { cookies } from "next/headers";

import MainNavigation from "@compoents/components/layout/main-navigation";
import styles from "./page.module.css";


export default function Home() {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("Authorization");
  return (
    <>
    <MainNavigation accessToken={accessToken}/>
    <section className={styles.flexSection1}></section>
    </>
  );
}
