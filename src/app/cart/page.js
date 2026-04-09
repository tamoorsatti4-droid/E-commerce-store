'use client';

import React from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Button from '@/components/ui/Button';
import { useCart } from '@/context/CartContext';
import styles from './page.module.css';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';

export default function CartPage() {
  const { cartItems, updateQuantity, removeFromCart, getCartTotal } = useCart();

  if (cartItems.length === 0) {
    return (
      <main className={styles.main}>
        <Navbar />
        <div className={styles.emptyCart}>
          <div className={styles.emptyIcon}>
              <ShoppingBag size={80} />
          </div>
          <h1>Your cart is empty</h1>
          <p>Explore our latest products and add something to your cart!</p>
          <Link href="/products">
            <Button size="lg">Start Shopping</Button>
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className={styles.main}>
      <Navbar />
      
      <div className={styles.container}>
        <h1 className={styles.title}>Shopping Cart</h1>

        <div className={styles.layout}>
          {/* Cart Items List */}
          <div className={styles.itemsList}>
            {cartItems.map((item) => (
              <div key={item.id} className={styles.cartItem}>
                <div className={styles.itemImage}>
                  <img src={item.image} alt={item.name} />
                </div>
                
                <div className={styles.itemInfo}>
                  <Link href={`/product/${item.id}`}>
                    <h3>{item.name}</h3>
                  </Link>
                  <p className={styles.itemCategory}>{item.category}</p>
                  <p className={styles.itemPrice}>Rs. {item.price.toLocaleString()}</p>
                </div>

                <div className={styles.itemActions}>
                  <div className={styles.quantity}>
                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                      <Minus size={16} />
                    </button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                      <Plus size={16} />
                    </button>
                  </div>
                  
                  <button 
                    className={styles.removeBtn}
                    onClick={() => removeFromCart(item.id)}
                  >
                    <Trash2 size={20} />
                  </button>
                </div>

                <div className={styles.itemTotal}>
                    Rs. {(item.price * item.quantity).toLocaleString()}
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className={styles.summaryArea}>
            <div className={styles.summaryCard}>
              <h3>Order Summary</h3>
              
              <div className={styles.summaryRow}>
                <span>Subtotal</span>
                <span>Rs. {getCartTotal().toLocaleString()}</span>
              </div>
              
              <div className={styles.summaryRow}>
                <span>Shipping</span>
                <span>Calculated at checkout</span>
              </div>

              <div className={`${styles.summaryRow} ${styles.totalRow}`}>
                <span>Total</span>
                <span>Rs. {getCartTotal().toLocaleString()}</span>
              </div>

              <Link href="/checkout">
                <Button className={styles.checkoutBtn} size="lg">
                  Proceed to Checkout <ArrowRight size={20} />
                </Button>
              </Link>
              
              <p className={styles.checkoutNote}>
                Manual payment instructions will be shown on the next page.
              </p>
            </div>
          </div>
        </div>
      </div>

      <footer style={{ padding: '60px 0', textAlign: 'center', borderTop: '1px solid var(--card-border)' }}>
         <p style={{ color: 'var(--secondary)' }}>&copy; 2026 E-Commerce Master | Developed for Pakistan</p>
      </footer>
    </main>
  );
}
