'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import styles from './ProductCard.module.css';
import { ShoppingCart, Star, Heart } from 'lucide-react';
import Button from './ui/Button';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  const { id, name, price, oldPrice, image, rating, reviews, category } = product;
  const discount = oldPrice ? Math.round(((oldPrice - price) / oldPrice) * 100) : 0;

  return (
    <div className={styles.card}>
      <div className={styles.imageWrapper}>
        <Link href={`/product/${id}`}>
          <img src={image} alt={name} className={styles.image} />
        </Link>
        {discount > 0 && <span className={styles.discount}>-{discount}%</span>}
        <button className={styles.wishlistBtn}>
          <Heart size={20} />
        </button>
      </div>

      <div className={styles.content}>
        <p className={styles.category}>{category}</p>
        <Link href={`/product/${id}`}>
          <h3 className={styles.name}>{name}</h3>
        </Link>
        
        <div className={styles.rating}>
          {[...Array(5)].map((_, i) => (
            <Star 
              key={i} 
              size={14} 
              className={i < rating ? styles.starFilled : styles.starEmpty} 
              fill={i < rating ? "currentColor" : "none"}
            />
          ))}
          <span className={styles.reviews}>({reviews})</span>
        </div>

        <div className={styles.footer}>
          <div className={styles.priceSection}>
            <span className={styles.price}>Rs. {price.toLocaleString()}</span>
            {oldPrice && <span className={styles.oldPrice}>Rs. {oldPrice.toLocaleString()}</span>}
          </div>
          <button 
            className={styles.addBtn} 
            onClick={() => addToCart(product)}
            title="Add to Cart"
          >
            <ShoppingCart size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
