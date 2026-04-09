'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import styles from './Navbar.module.css';
import { ShoppingCart, User, Menu, X, Search, LogOut, LayoutDashboard } from 'lucide-react';
import Button from './ui/Button';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { getCartCount } = useCart();
  const { user, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`${styles.nav} ${isScrolled ? styles.scrolled : ''}`}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          <div className={styles.logoIcon}>E</div>
          <span>E-Commerce Master</span>
        </Link>

        {/* Desktop Links */}
        <div className={styles.links}>
          <Link href="/" className={styles.link}>Home</Link>
          <Link href="/products" className={styles.link}>Products</Link>
          <Link href="/categories" className={styles.link}>Categories</Link>
          <Link href="/track-order" className={styles.link}>Track Order</Link>
        </div>

        {/* User Actions */}
        <div className={styles.actions}>
          <div className={styles.searchBox}>
            <Search size={20} className={styles.searchIcon} />
            <input type="text" placeholder="Search..." className={styles.searchInput} />
          </div>

          <Link href="/cart" className={styles.cartBtn}>
            <ShoppingCart size={24} />
            {getCartCount() > 0 && (
              <span className={styles.badge}>{getCartCount()}</span>
            )}
          </Link>

          {user ? (
            <div className={styles.userMenu}>
              <Link href="/admin" className={styles.adminLink}>
                <LayoutDashboard size={20} />
              </Link>
              <button onClick={logout} className={styles.logoutBtn}>
                <LogOut size={20} />
              </button>
            </div>
          ) : (
            <Link href="/login">
              <Button size="sm" variant="outline">Login</Button>
            </Link>
          )}

          <button className={styles.mobMenuBtn} onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`${styles.mobMenu} ${isMenuOpen ? styles.mobMenuOpen : ''}`}>
        <div className={styles.mobLinks}>
          <Link href="/" onClick={() => setIsMenuOpen(false)}>Home</Link>
          <Link href="/products" onClick={() => setIsMenuOpen(false)}>Products</Link>
          <Link href="/categories" onClick={() => setIsMenuOpen(false)}>Categories</Link>
          <Link href="/track-order" onClick={() => setIsMenuOpen(false)}>Track Order</Link>
          {user ? (
             <>
               <Link href="/admin" onClick={() => setIsMenuOpen(false)}>Dashboard</Link>
               <button onClick={() => { logout(); setIsMenuOpen(false); }}>Logout</button>
             </>
          ) : (
            <Link href="/login" onClick={() => setIsMenuOpen(false)}>Login</Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
