import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import ConnectButton from "../components/WalletConnect/ConnectButton";
import FileUpload from "../components/UploadFile/UploadFile";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>EthBerlin 2022</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className={styles.header}>
        {" "}
        <ConnectButton />
      </header>

      <main className={styles.main}>
        
        <h1 className={styles.title}>VidQ</h1>

        <div className={styles.grid}></div>

        <FileUpload />
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
}
