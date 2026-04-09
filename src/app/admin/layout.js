'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './layout.module.css';
import { 
  LayoutDashboard, 
  ShoppingBag, 
  Layers, 
  Users, 
  Settings, 
  LogOut, 
  Bell, 
  Search,
  Menu,
  X,
  TrendingUp,
  Package
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

const SIDEBAR_LINKS = [
  { name: 'Dashboard', icon: <LayoutDashboard size={20} />, href: '/admin' },
  { name: 'Orders', icon: <ShoppingBag size={20} />, href: '/admin/orders' },
  { name: 'Products', icon: <Package size={20} />, href: '/admin/products' },
  { name: 'Categories', icon: <Layers size={20} />, href: '/admin/categories' },
  { name: 'Customers', icon: <Users size={20} />, href: '/admin/customers' },
  { name: 'Settings', icon: <Settings size={20} />, href: '/admin/settings' },
];

export default function AdminLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const pathname = usePathname();
  const { logout } = useAuth();

  // Don't show sidebar on login page
  if (pathname === '/admin/login') return <>{children}</>;

  return (
    <div className={styles.adminWrapper}>
      {/* Sidebar */}
      <aside className={`${styles.sidebar} ${!isSidebarOpen ? styles.sidebarClosed : ''}`}>
        <div className={styles.logo}>
          <div className={styles.logoIcon}>E</div>
          <span>E-Commerce Admin</span>
        </div>

        <nav className={styles.nav}>
          {SIDEBAR_LINKS.map((link) => (
            <Link 
              key={link.href} 
              href={link.href}
              className={`${styles.navLink} ${pathname === link.href ? styles.activeLink : ''}`}
            >
              {link.icon}
              <span>{link.name}</span>
            </Link>
          ))}
        </nav>

        <button className={styles.logout} onClick={logout}>
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </aside>

      {/* Main Content Area */}
      <main className={styles.main}>
        {/* Topbar */}
        <header className={styles.topbar}>
          <button className={styles.toggleBtn} onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
            {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          <div className={styles.search}>
            <Search size={20} />
            <input type="text" placeholder="Search orders, products..." />
          </div>

          <div className={styles.topActions}>
            <button className={styles.iconBtn}>
                <Bell size={20} />
                <span className={styles.notifBadge}></span>
            </button>
            <div className={styles.adminProfile}>
                <img 
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&auto=format&fit=crop&q=60" 
                  alt="Admin" 
                />
                <div className={styles.adminInfo}>
                    <strong>Admin User</strong>
                    <span>Super Admin</span>
                </div>
            </div>
          </div>
        </header>

        <div className={styles.content}>
          {children}
        </div>
      </main>
    </div>
  );
}
