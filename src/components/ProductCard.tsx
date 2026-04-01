"use client";
import { useCart } from "./CartContext";
import styles from "./ProductCard.module.css";

export default function ProductCard({ product }: { product: any }) {
  const { lang, addToCart } = useCart();

  const name = lang === "en" ? product.nameEn : product.nameUr;
  const description = lang === "en" ? product.descriptionEn : product.descriptionUr;

  return (
    <div className={styles.card}>
      {product.imageUrl && (
        <img src={product.imageUrl} alt={name} className={styles.image} />
      )}
      <div className={styles.content}>
        <h3>{name}</h3>
        <p className={styles.desc}>{description}</p>
        <p className={styles.price}>Rs. {product.price}</p>
        <button
          onClick={() => addToCart({ ...product, quantity: 1, productId: product.id })}
          className={styles.addBtn}
        >
          {lang === "en" ? "Add to Cart" : "ٹوکری میں شامل کریں"}
        </button>
      </div>
    </div>
  );
}
