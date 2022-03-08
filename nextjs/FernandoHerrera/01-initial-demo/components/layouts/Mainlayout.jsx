import Head from "next/head";
import { Navbar } from "../Navbar";
import styles from "./MainLayout.module.css";

export const Mainlayout = ({ children }) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Home - Jorge Santamaria</title>
        <meta name="description" content="Home Page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />

      <main className={styles.main}>{children}</main>
    </div>
  );
};
