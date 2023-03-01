'use client';
import RootView from "@/app/components/RootView";
import styles from "./page.module.css";

/***
 * TODO: 
 *    - i need to have a request for a current value
 * 
 */
export default function Home() {
  return (
    <main className={styles.main}>
      <RootView/> 
    </main>
  );
}
