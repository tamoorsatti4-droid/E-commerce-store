"use client";
import Link from "next/link";
import { useCart } from "./CartContext";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const { items, lang, toggleLang } = useCart();
  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <nav className={styles.nav}>
      <div className={styles.logo}>
        <Link href="/">{lang === "en" ? "MyStore" : "میرا سٹور"}</Link>
      </div>
      <div className={styles.actions}>
        <button onClick={toggleLang} className={styles.langBtn}>
          {lang === "en" ? "اردو" : "English"}
        </button>
        <Link href="/cart" className={styles.cartLink}>
          {lang === "en" ? "Cart" : "ٹوکری"} ({totalItems})
        </Link>
        <Link href="/admin" className={styles.adminLink}>
          {lang === "en" ? "Admin" : "ایڈمن"}
        </Link>
      </div>
    </nav>
  );
}
