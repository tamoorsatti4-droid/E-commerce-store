'use client';

import React, { useState, useMemo } from 'react';
import Navbar from '@/components/Navbar';
import ProductCard from '@/components/ProductCard';
import styles from './page.module.css';
import { Filter, Search, ChevronDown, LayoutGrid, List } from 'lucide-react';

const MOCK_PRODUCTS = [
  {
    id: '1',
    name: 'iPhone 15 Pro Max',
    price: 450000,
    oldPrice: 480000,
    image: 'https://images.unsplash.com/photo-1696446701796-da61225697cc?w=800&auto=format&fit=crop&q=60',
    rating: 5,
    reviews: 124,
    category: 'Mobiles'
  },
  {
    id: '2',
    name: 'MacBook Pro M3 Max',
    price: 850000,
    oldPrice: 900000,
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&auto=format&fit=crop&q=60',
    rating: 5,
    reviews: 86,
    category: 'Laptops'
  },
  {
    id: '3',
    name: 'Sony WH-1000XM5',
    price: 85000,
    oldPrice: 105000,
    image: 'https://images.unsplash.com/photo-1618366712214-8c07623ce55d?w=800&auto=format&fit=crop&q=60',
    rating: 4,
    reviews: 210,
    category: 'Audio'
  },
  {
    id: '4',
    name: 'Apple Watch Series 9',
    price: 115000,
    oldPrice: 130000,
    image: 'https://images.unsplash.com/photo-1434493907317-a46b53b81882?w=800&auto=format&fit=crop&q=60',
    rating: 5,
    reviews: 56,
    category: 'Watches'
  },
  {
    id: '5',
    name: 'Samsung Galaxy S24 Ultra',
    price: 390000,
    oldPrice: 420000,
    image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=800&auto=format&fit=crop&q=60',
    rating: 5,
    reviews: 95,
    category: 'Mobiles'
  },
  {
    id: '6',
    name: 'iPad Pro M4',
    price: 320000,
    oldPrice: 350000,
    image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=800&auto=format&fit=crop&q=60',
    rating: 5,
    reviews: 74,
    category: 'Laptops'
  }
];

const CATEGORIES = ['All', 'Mobiles', 'Laptops', 'Audio', 'Watches'];

export default function ProductListing() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('featured'); // 'newest', 'price-low', 'price-high'

  const filteredProducts = useMemo(() => {
    return MOCK_PRODUCTS.filter(product => {
      const matchCategory = activeCategory === 'All' || product.category === activeCategory;
      const matchSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCategory && matchSearch;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      return 0; // Default: Featured
    });
  }, [activeCategory, searchQuery, sortBy]);

  return (
    <main className={styles.main}>
      <Navbar />
      
      <div className={styles.container}>
        <div className={styles.header}>
            <div className={styles.titleArea}>
                <h1>Our Products</h1>
                <p>Showing {filteredProducts.length} results</p>
            </div>
            
            <div className={styles.controls}>
                <div className={styles.filtersWrapper}>
                    {CATEGORIES.map(cat => (
                        <button 
                            key={cat} 
                            className={`${styles.filterBtn} ${activeCategory === cat ? styles.activeFilter : ''}`}
                            onClick={() => setActiveCategory(cat)}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                <div className={styles.searchBar}>
                    <Search size={20} />
                    <input 
                        type="text" 
                        placeholder="Search products..." 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>

                <div className={styles.sortDropdown}>
                    <ChevronDown size={20} className={styles.sortIcon} />
                    <select 
                        value={sortBy} 
                        onChange={(e) => setSortBy(e.target.value)}
                        className={styles.select}
                    >
                        <option value="featured">Featured</option>
                        <option value="price-low">Price: Low to High</option>
                        <option value="price-high">Price: High to Low</option>
                    </select>
                </div>
            </div>
        </div>

        <div className={styles.productGrid}>
          {filteredProducts.length > 0 ? (
            filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <div className={styles.noResults}>
                <h3>No products found matching your search.</h3>
                <p>Try searching for something else or change filters.</p>
            </div>
          )}
        </div>
      </div>

      <footer style={{ padding: '60px 0', textAlign: 'center', borderTop: '1px solid var(--card-border)' }}>
         <p style={{ color: 'var(--secondary)' }}>&copy; 2026 E-Commerce Master | Pakistan's Choice</p>
      </footer>
    </main>
  );
}
