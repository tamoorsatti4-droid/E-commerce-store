'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import ProductCard from '@/components/ProductCard';
import Button from '@/components/ui/Button';
import styles from './page.module.css';
import { ArrowRight, Smartphone, Laptop, Watch, Headphones, Zap, TrendingUp, CheckCircle } from 'lucide-react';

const FEATURED_PRODUCTS = [
  {
    id: '1',
    name: 'iPhone 15 Pro Max - Natural Titanium',
    price: 450000,
    oldPrice: 480000,
    image: 'https://images.unsplash.com/photo-1696446701796-da61225697cc?w=800&auto=format&fit=crop&q=60',
    rating: 5,
    reviews: 124,
    category: 'Mobile',
    featured: true
  },
  {
    id: '2',
    name: 'MacBook Pro M3 Max 14-inch',
    price: 850000,
    oldPrice: 900000,
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&auto=format&fit=crop&q=60',
    rating: 5,
    reviews: 86,
    category: 'Laptop'
  },
  {
    id: '3',
    name: 'Sony WH-1000XM5 Noise Cancelling',
    price: 85000,
    oldPrice: 105000,
    image: 'https://images.unsplash.com/photo-1618366712214-8c07623ce55d?w=800&auto=format&fit=crop&q=60',
    rating: 4,
    reviews: 210,
    category: 'Audio'
  },
  {
    id: '4',
    name: 'Apple Watch Series 9 GPS',
    price: 115000,
    oldPrice: 130000,
    image: 'https://images.unsplash.com/photo-1434493907317-a46b53b81882?w=800&auto=format&fit=crop&q=60',
    rating: 5,
    reviews: 56,
    category: 'Watch'
  }
];

const CATEGORIES = [
  { name: 'Mobiles', icon: <Smartphone />, count: 124 },
  { name: 'Laptops', icon: <Laptop />, count: 86 },
  { name: 'Watches', icon: <Watch />, count: 42 },
  { name: 'Audio', icon: <Headphones />, count: 95 }
];

export default function Home() {
  return (
    <main className={styles.main}>
      <Navbar />
      
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <div className={styles.badge}>
            <Zap size={16} /> 
            <span>Limited Time Offers - Up to 40% OFF</span>
          </div>
          <h1>The Next Generation of <span>Shopping</span> in Pakistan</h1>
          <p>
            Experience premium e-commerce with fast delivery, secure manual payments, 
            and 24/7 support. Shop the latest tech and lifestyle products.
          </p>
          <div className={styles.heroBtns}>
            <Link href="/products">
              <Button size="lg">Shop Now <ArrowRight size={20} /></Button>
            </Link>
            <Link href="/categories">
              <Button size="lg" variant="outline">View Categories</Button>
            </Link>
          </div>
          
          <div style={{ marginTop: '40px', display: 'flex', gap: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--secondary)' }}>
                <CheckCircle size={18} color="var(--success)" />
                <span style={{ fontSize: '14px' }}>Verified Payments</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--secondary)' }}>
                <CheckCircle size={18} color="var(--success)" />
                <span style={{ fontSize: '14px' }}>Fast Shipping</span>
            </div>
          </div>
        </div>

        <div className={styles.heroImage}>
            {/* Using an abstract placeholder image for the hero */}
            <img 
              src="https://images.unsplash.com/photo-1491933382434-500287f9b54b?w=800&auto=format&fit=crop&q=60" 
              alt="Hero Tech" 
              style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '30px' }}
            />
        </div>
      </section>

      {/* Featured Products */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2>Featured Products</h2>
          <Link href="/products" className={styles.viewAll}>
            View All Products <ArrowRight size={20} />
          </Link>
        </div>
        <div className={styles.productGrid}>
          {FEATURED_PRODUCTS.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Categories Section */}
      <section className={styles.section} style={{ background: 'rgba(0, 98, 255, 0.02)' }}>
        <div className={styles.sectionHeader}>
          <h2>Shop by Category</h2>
          <Link href="/categories" className={styles.viewAll}>
            Browse All <ArrowRight size={20} />
          </Link>
        </div>
        <div className={styles.categoriesGrid}>
          {CATEGORIES.map((cat, idx) => (
            <div key={idx} className={styles.categoryCard}>
              <div className={styles.categoryIcon}>
                {cat.icon}
              </div>
              <h3>{cat.name}</h3>
              <p style={{ fontSize: '14px', opacity: 0.6, marginTop: '8px' }}>{cat.count} Products</p>
            </div>
          ))}
        </div>
      </section>

      {/* Latest Deals */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
             <TrendingUp size={32} color="var(--primary)" />
             <h2>Hot Deals This Week</h2>
          </div>
        </div>
        <div className={styles.productGrid}>
          {FEATURED_PRODUCTS.slice(2).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
          {/* Re-using some featured ones for layout completeness */}
          {FEATURED_PRODUCTS.slice(0, 2).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Trust Badges */}
      <section className={styles.section} style={{ borderTop: '1px solid var(--card-border)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '40px' }}>
             <div style={{ textAlign: 'center' }}>
                <h3 style={{ marginBottom: '12px' }}>Fast Delivery</h3>
                <p style={{ color: 'var(--secondary)' }}>Express shipping to all cities in Pakistan within 3-5 days.</p>
             </div>
             <div style={{ textAlign: 'center' }}>
                <h3 style={{ marginBottom: '12px' }}>Manual Verification</h3>
                <p style={{ color: 'var(--secondary)' }}>Safe & Secure payments via EasyPaisa, JazzCash, or Bank Transfer.</p>
             </div>
             <div style={{ textAlign: 'center' }}>
                <h3 style={{ marginBottom: '12px' }}>24/7 Support</h3>
                <p style={{ color: 'var(--secondary)' }}>Dedicated customer support for all your queries and order tracking.</p>
             </div>
        </div>
      </section>

      <footer style={{ padding: '60px 5%', borderTop: '1px solid var(--card-border)', textAlign: 'center' }}>
         <p style={{ color: 'var(--secondary)' }}>&copy; 2026 E-Commerce Master | Developed for Pakistan</p>
      </footer>
    </main>
  );
}
