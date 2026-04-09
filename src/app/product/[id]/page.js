'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Button from '@/components/ui/Button';
import { useCart } from '@/context/CartContext';
import styles from './page.module.css';
import { Star, ShoppingCart, ShieldCheck, Truck, RotateCcw, Plus, Minus, Facebook, Twitter, MessageCircle } from 'lucide-react';

const MOCK_PRODUCTS = [
  {
    id: '1',
    name: 'iPhone 15 Pro Max',
    price: 450000,
    oldPrice: 480000,
    image: 'https://images.unsplash.com/photo-1696446701796-da61225697cc?w=800&auto=format&fit=crop&q=60',
    rating: 5,
    reviews: 124,
    category: 'Mobiles',
    description: 'The iPhone 15 Pro Max features a strong and light aerospace-grade titanium design with a textured matte-glass back. It also features a Ceramic Shield front that’s tougher than any smartphone glass. And it’s splash, water, and dust resistant.',
    specs: [
      { key: 'Screen', value: '6.7-inch Super Retina XDR' },
      { key: 'Chip', value: 'A17 Pro chip' },
      { key: 'Camera', value: '48MP Main | 12MP Ultra Wide | 12MP Telephoto' },
      { key: 'Battery', value: 'Up to 29 hours video playback' }
    ]
  },
  {
    id: '2',
    name: 'MacBook Pro M3 Max',
    price: 850000,
    oldPrice: 900000,
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&auto=format&fit=crop&q=60',
    rating: 5,
    reviews: 86,
    category: 'Laptops',
    description: 'The most advanced chips ever built for a personal computer. MacBook Pro with M3 Max chips features a powerful CPU and GPU to handle the most demanding workflows.',
    specs: [
      { key: 'Processor', value: 'Apple M3 Max' },
      { key: 'Memory', value: '36GB Unified Memory' },
      { key: 'Storage', value: '1TB SSD' },
      { key: 'Display', value: '14-inch Liquid Retina XDR' }
    ]
  },
  {
    id: '3',
    name: 'Sony WH-1000XM5',
    price: 85000,
    oldPrice: 105000,
    image: 'https://images.unsplash.com/photo-1618366712214-8c07623ce55d?w=800&auto=format&fit=crop&q=60',
    rating: 4,
    reviews: 210,
    category: 'Audio',
    description: 'Sony’s best-ever noise cancelling. With two processors controlling eight microphones, Auto NC Optimizer for automatically optimizing noise cancelling based on your wearing conditions and environment.',
    specs: [
      { key: 'Battery Life', value: 'Up to 30 hours' },
      { key: 'Connectivity', value: 'Bluetooth 5.2' },
      { key: 'Features', value: 'Active Noise Cancellation' },
      { key: 'Weight', value: '250g' }
    ]
  }
];

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  useEffect(() => {
    // In a real app, this would be a Firestore fetch
    const foundProduct = MOCK_PRODUCTS.find(p => p.id === id);
    setProduct(foundProduct || MOCK_PRODUCTS[0]);
  }, [id]);

  if (!product) return null;

  return (
    <main className={styles.main}>
      <Navbar />
      
      <div className={styles.container}>
        <div className={styles.productLayout}>
          {/* Image Gallery Area */}
          <div className={styles.gallery}>
            <div className={styles.mainImage}>
               <img src={product.image} alt={product.name} />
            </div>
            {/* Could add thumbnails here */}
          </div>

          {/* Details Area */}
          <div className={styles.details}>
            <span className={styles.category}>{product.category}</span>
            <h1 className={styles.title}>{product.name}</h1>
            
            <div className={styles.ratingRow}>
                <div className={styles.stars}>
                    {[...Array(5)].map((_, i) => (
                        <Star 
                            key={i} 
                            size={18} 
                            fill={i < product.rating ? "#ffc107" : "none"} 
                            color={i < product.rating ? "#ffc107" : "#e4e5e9"} 
                        />
                    ))}
                </div>
                <span className={styles.reviewCount}>{product.reviews} customer reviews</span>
            </div>

            <div className={styles.priceRow}>
                <span className={styles.price}>Rs. {product.price.toLocaleString()}</span>
                {product.oldPrice && <span className={styles.oldPrice}>Rs. {product.oldPrice.toLocaleString()}</span>}
            </div>

            <p className={styles.description}>{product.description}</p>

            <div className={styles.actions}>
                <div className={styles.quantitySelector}>
                    <button onClick={() => setQuantity(q => Math.max(1, q - 1))}><Minus size={18} /></button>
                    <span>{quantity}</span>
                    <button onClick={() => setQuantity(q => q + 1)}><Plus size={18} /></button>
                </div>
                <Button 
                    className={styles.addBtn}
                    onClick={() => {
                        for(let i=0; i<quantity; i++) addToCart(product);
                    }}
                >
                    <ShoppingCart size={20} /> Add to Cart
                </Button>
            </div>

            <div className={styles.features}>
                <div className={styles.feature}>
                    <ShieldCheck color="var(--primary)" size={24} />
                    <div>
                        <strong>1 Year Warranty</strong>
                        <p>Authorized Pakistan Warranty</p>
                    </div>
                </div>
                <div className={styles.feature}>
                    <Truck color="var(--primary)" size={24} />
                    <div>
                        <strong>Fast Delivery</strong>
                        <p>3-5 Business Days</p>
                    </div>
                </div>
                <div className={styles.feature}>
                    <RotateCcw color="var(--primary)" size={24} />
                    <div>
                        <strong>7 Days Return</strong>
                        <p>Hassle-free return policy</p>
                    </div>
                </div>
            </div>

            <div className={styles.share}>
                <span>Share:</span>
                <Facebook size={20} className={styles.shareIcon} />
                <Twitter size={20} className={styles.shareIcon} />
                <MessageCircle size={20} className={styles.shareIcon} />
            </div>
          </div>
        </div>

        {/* Info Tabs / Specs */}
        <div className={styles.specsSection}>
            <h2>Specifications</h2>
            <div className={styles.specsGrid}>
                {product.specs.map((spec, index) => (
                    <div key={index} className={styles.specItem}>
                        <span className={styles.specKey}>{spec.key}</span>
                        <span className={styles.specValue}>{spec.value}</span>
                    </div>
                ))}
            </div>
        </div>
      </div>

      <footer style={{ padding: '60px 0', textAlign: 'center', borderTop: '1px solid var(--card-border)' }}>
         <p style={{ color: 'var(--secondary)' }}>&copy; 2026 E-Commerce Master | Developed for Pakistan</p>
      </footer>
    </main>
  );
}
