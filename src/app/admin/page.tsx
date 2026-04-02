"use client";
import React, { PureComponent } from 'react';
import styles from "./admin.module.css";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useCart } from "@/components/CartContext";
import { TrendingUp, AlertTriangle, Calendar, Users, MoreHorizontal } from "lucide-react";

const trendData = [
  { name: 'Jan', pv: 4000 },
  { name: 'Feb', pv: 3000 },
  { name: 'Mar', pv: 8000 },
  { name: 'Apr', pv: 4708 },
  { name: 'May', pv: 6800 },
  { name: 'Jun', pv: 14000 },
  { name: 'Jul', pv: 9000 },
  { name: 'Aug', pv: 16000 },
  { name: 'Sep', pv: 13000 },
  { name: 'Oct', pv: 21000 },
  { name: 'Nov', pv: 19000 },
  { name: 'Dec', pv: 24000 },
];

const recentOrders = [
  { id: "211750021", name: "Hayat Eklolan", nameUr: "حیات اکلولان", status: "Badged", statusUr: "بیجڈ", total: "$360.00" },
  { id: "211750022", name: "Alesan Admin", nameUr: "ایلیسن ایڈمن", status: "Badged", statusUr: "بیجڈ", total: "$250.00" },
  { id: "211750023", name: "Customer Name", nameUr: "کسٹمر کا نام", status: "Warning", statusUr: "تنبیہ", total: "$185.00" },
  { id: "211750024", name: "Customer Name", nameUr: "کسٹمر کا نام", status: "Proceed", statusUr: "عمل میں", total: "$150.00" },
  { id: "211750025", name: "Manna Aola", nameUr: "منا اولا", status: "Badged", statusUr: "بیجڈ", total: "$289.00" },
];

export default function AdminDashboard() {
  const { lang } = useCart();
  const isEn = lang === "en";

  return (
    <>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>{isEn ? "Dashboard" : "ڈیش بورڈ"}</h1>
      </div>

      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div className={styles.statHeader}>
            <span className={styles.statTitle}>{isEn ? "Total Sales (Today)" : "کل فروخت (آج)"}</span>
            <span className={`${styles.trendBadge} ${styles.trendUp}`}>
              <TrendingUp size={14} /> Trend
            </span>
          </div>
          <div className={styles.statValue}>$3,020.87</div>
          <div style={{ height: "60px", marginTop: "10px" }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trendData.slice(0, 5)}>
                <Line type="monotone" dataKey="pv" stroke="#2563eb" strokeWidth={3} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statHeader}>
            <span className={styles.statTitle}>{isEn ? "Low Stock Alerts" : "کم اسٹاک الرٹس"}</span>
            <AlertTriangle size={18} color="#dc2626" />
          </div>
          <div className={styles.statValue}>13</div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statHeader}>
            <span className={styles.statTitle}>{isEn ? "Processing Orders" : "زیر عمل آرڈرز"}</span>
            <Calendar size={18} color="#2563eb" />
          </div>
          <div className={styles.statValue}>21</div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statHeader}>
            <span className={styles.statTitle}>{isEn ? "New Customers" : "نئے کسٹمرز"}</span>
            <Users size={18} color="#16a34a" />
          </div>
          <div className={styles.statValue}>12</div>
        </div>
      </div>

      <div className={styles.mainGrid}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <div className={styles.totalSalesCard} style={{ flex: '1' }}>
              <div className={styles.statTitle}>{isEn ? "Total Sales" : "کل فروخت"}</div>
              <div className={styles.statValue} style={{ fontSize: '2.5rem' }}>3,281.34</div>
              <div style={{ fontSize: '0.85rem', color: '#64748b' }}>
                {isEn ? "Last 300 days" : "گزشتہ ۳۰۰ دن"}
              </div>
              <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'flex-end' }}>
                <div style={{ background: '#dcfce7', padding: '8px', borderRadius: '8px' }}>
                  <TrendingUp size={20} color="#16a34a" />
                </div>
              </div>
            </div>
            
            <div className={styles.revenueChartCard} style={{ flex: '2' }}>
              <div className={styles.statTitle} style={{ marginBottom: '1rem' }}>
                {isEn ? "Revenue Trends (Last 30 Days)" : "آمدنی کے رجحانات (گزشتہ ۳۰ دن)"}
              </div>
              <div style={{ height: "180px" }}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={trendData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} dy={10} />
                    <Line type="monotone" dataKey="pv" stroke="#3b82f6" strokeWidth={2} dot={{ r: 4, fill: '#3b82f6', strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 6 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          <div className={styles.glassPanel}>
            <div className={styles.panelHeader}>
              <h3 className={styles.panelTitle}>{isEn ? "Recent Orders" : "حالیہ آرڈرز"}</h3>
              <MoreHorizontal size={20} color="#64748b" />
            </div>
            <div className={styles.tableContainer}>
              <table className={styles.ordersTable}>
                <thead>
                  <tr>
                    <th>{isEn ? "Order ID" : "آرڈر آئی ڈی"}</th>
                    <th>{isEn ? "Customer Name" : "کسٹمر کا نام"}</th>
                    <th>{isEn ? "Status" : "حیثیت"}</th>
                    <th>{isEn ? "Total" : "کل رقم"}</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map((order, i) => (
                    <tr key={i}>
                      <td>{order.id}</td>
                      <td>{isEn ? order.name : order.nameUr}</td>
                      <td>
                        <span className={`${styles.badge} ${
                          order.status === "Badged" ? styles.badgeSuccess :
                          order.status === "Warning" ? styles.badgeWarning : styles.badgeSuccess
                        }`}>
                          {isEn ? order.status : order.statusUr}
                        </span>
                      </td>
                      <td style={{ fontWeight: 500 }}>{order.total}</td>
                      <td style={{ textAlign: isEn ? 'right' : 'left' }}>
                        <button className={styles.actionBtn}>
                          {isEn ? "Quick View/Manage" : "فوری دیکھیں / نظم کریں"}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div className={styles.glassPanel}>
            <div className={styles.panelHeader}>
              <h3 className={styles.panelTitle}>{isEn ? "Top Selling Products" : "سب سے زیادہ بکنے والے پروڈکٹس"}</h3>
              <MoreHorizontal size={20} color="#64748b" />
            </div>
            <div className={styles.productItem}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=200&auto=format&fit=crop" alt="Shoes" className={styles.productImg} />
              <div className={styles.productInfo}>
                <div className={styles.productName}>
                  {isEn ? "Top Selling Products Wearing Product" : "بہترین قسم کے جوتے"}
                </div>
                <div className={styles.productPrice}>$35.00</div>
              </div>
            </div>
          </div>

          <div className={styles.glassPanel}>
            <div className={styles.panelHeader}>
              <h3 className={styles.panelTitle}>{isEn ? "Inventory at Risk" : "خطرہ میں انوینٹری"}</h3>
              <MoreHorizontal size={20} color="#64748b" />
            </div>
            
            <div className={styles.productItem} style={{ marginBottom: '1.5rem' }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?q=80&w=200&auto=format&fit=crop" alt="Laptop" className={styles.productImg} />
              <div className={styles.productInfo}>
                <div className={styles.progressHeader}>
                  <span>{isEn ? "Progress at Risk" : "خطرہ میں انوینٹری"}</span>
                  <span style={{ color: '#2563eb' }}>40%</span>
                </div>
                <div className={styles.progressBar}>
                  <div className={styles.progressFill} style={{ width: '40%', background: '#2563eb' }}></div>
                </div>
              </div>
            </div>

            <div className={styles.productItem}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=200&auto=format&fit=crop" alt="Headphones" className={styles.productImg} />
              <div className={styles.productInfo}>
                <div className={styles.progressHeader}>
                  <span>{isEn ? "Progress" : "پیش رفت"}</span>
                  <span style={{ color: '#dc2626' }}>55%</span>
                </div>
                <div className={styles.progressBar}>
                  <div className={styles.progressFill} style={{ width: '55%', background: '#dc2626' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
