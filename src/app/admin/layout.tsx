"use client";
import React from "react";
import styles from "./admin.module.css";
import { useCart } from "@/components/CartContext";
import { 
  LayoutDashboard, 
  Package, 
  Inbox, 
  Users, 
  Megaphone, 
  FileText, 
  UserSquare2, 
  Settings,
  Search,
  Bell,
  Package2
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { name: "Dashboard", urName: "ڈیش بورڈ", icon: LayoutDashboard, path: "/admin" },
  { name: "Orders & Logistics", urName: "آرڈرز اور لاجسٹکس", icon: Inbox, path: "/admin/orders" },
  { name: "Inventory Control", urName: "انوینٹری کنٹرول", icon: Package, path: "/admin/inventory" },
  { name: "Customer CRM", urName: "کسٹمر سی آر ایم", icon: Users, path: "/admin/customers" },
  { name: "Marketing Campaigns", urName: "مارکیٹنگ مہمات", icon: Megaphone, path: "/admin/marketing" },
  { name: "Financial Reports", urName: "مالیاتی رپورٹس", icon: FileText, path: "/admin/reports" },
  { name: "Staff Management", urName: "اسٹاف مینجمنٹ", icon: UserSquare2, path: "/admin/staff" },
  { name: "Settings", urName: "ترتیبات", icon: Settings, path: "/admin/settings" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { lang, toggleLang } = useCart();
  const pathname = usePathname();

  return (
    <div className={styles.adminLayout}>
      <aside className={styles.sidebar}>
        <div className={styles.logo}>
          <div className={styles.logoIcon}>
            <Package2 size={24} />
          </div>
          <span>{lang === "en" ? "E-Commerce" : "ای کامرس"}</span>
        </div>
        <nav className={styles.navMenu}>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.path;
            return (
              <Link href={item.path} key={item.path}>
                <div className={`${styles.navItem} ${isActive ? styles.active : ""}`}>
                  <Icon size={20} />
                  <span>{lang === "en" ? item.name : item.urName}</span>
                </div>
              </Link>
            );
          })}
        </nav>
      </aside>
      <main className={styles.mainContent}>
        <header className={styles.topbar}>
          <div className={styles.searchBar}>
            <Search size={18} color="#64748b" />
            <input 
              type="text" 
              placeholder={lang === "en" ? "Search" : "تلاش کریں..."} 
            />
          </div>
          <div className={styles.topActions}>
            <button className={styles.iconBtn} onClick={toggleLang} title="Toggle Language">
              {lang === "en" ? "اردو" : "EN"}
            </button>
            <button className={styles.iconBtn}>
              <Bell size={20} />
            </button>
            <div className={styles.profile}>
              <div className={styles.avatar}>
                <img src="https://i.pravatar.cc/150?img=11" alt="Admin" />
              </div>
              <div className={styles.profileInfo}>
                <span className={styles.profileName}>Sikandar</span>
                <span className={styles.profileRole}>Admin</span>
              </div>
            </div>
          </div>
        </header>
        <div className={styles.dashboardScroll}>
          {children}
        </div>
      </main>
    </div>
  );
}
