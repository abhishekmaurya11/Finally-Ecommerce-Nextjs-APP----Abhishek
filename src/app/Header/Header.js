import Link from "next/link";
import styles from "./header.module.css";

export default function Header() {
  return (
    <header className="text-center p-4 bg-gray-200"> 
      <h1>Welcome to E commerce Website -- "Shop Free Here" </h1>
      <div className={`${styles.flex} p-6 font-bold text-lg`}>
        <Link className={`${styles.link}`} href="/SignUp">SignUp</Link>
        <Link className={`${styles.link}`} href="/Login">Login</Link>
      </div>
    </header>
  );
}