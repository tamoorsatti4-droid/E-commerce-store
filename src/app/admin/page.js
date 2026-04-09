'use client';

import React from 'react';
import styles from './page.module.css';
import Card from '@/components/ui/Card';
import { 
  TrendingUp, 
  ShoppingBag, 
  Users, 
  DollarSign, 
  ArrowUpRight, 
  ArrowDownRight,
  AlertTriangle,
  Clock,
  ExternalLink
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';

const STATS = [
  { name: 'Total Sales (Today)', value: '$3,020.87', change: '+12.5%', icon: <DollarSign />, trend: 'up' },
  { name: 'Low Stock Alerts', value: '13', change: '5 Critical', icon: <AlertTriangle />, trend: 'down', color: 'var(--error)' },
  { name: 'Processing Orders', value: '21', change: '+3 New', icon: <Clock />, trend: 'up' },
  { name: 'New Customers', value: '12', change: '+20%', icon: <Users />, trend: 'up' },
];

const REVENUE_DATA = [
  { name: 'Jan', revenue: 4000, sales: 2400 },
  { name: 'Feb', revenue: 3000, sales: 1398 },
  { name: 'Mar', revenue: 2000, sales: 9800 },
  { name: 'Apr', revenue: 2780, sales: 3908 },
  { name: 'May', revenue: 1890, sales: 4800 },
  { name: 'Jun', revenue: 2390, sales: 3800 },
  { name: 'Jul', revenue: 3490, sales: 4300 },
];

const RECENT_ORDERS = [
  { id: '211750021', customer: 'Hayat Elolan', status: 'Paid', total: '$360.00' },
  { id: '211750022', customer: 'Alesan Admin', status: 'Pending', total: '$250.00' },
  { id: '211750023', customer: 'Customer Name', status: 'Delivered', total: '$185.00' },
  { id: '211750024', customer: 'Customer Name', status: 'Processing', total: '$150.00' },
  { id: '211750025', customer: 'Manna Aola', status: 'Rejected', total: '$289.00' },
];

export default function AdminDashboard() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
           <h1 className={styles.title}>Dashboard Overview</h1>
           <p className={styles.subtitle}>Welcome back, here's what's happening with your store today.</p>
        </div>
        <div className={styles.actions}>
            <button className={styles.reportBtn}>
                <TrendingUp size={18} />
                Generate Report
            </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className={styles.statsGrid}>
        {STATS.map((stat, idx) => (
          <Card key={idx} className={styles.statCard} glass>
            <div className={styles.statIcon} style={{ color: stat.color || 'var(--primary)' }}>
                {stat.icon}
            </div>
            <div className={styles.statInfo}>
                <span className={styles.statLabel}>{stat.name}</span>
                <div className={styles.statValueArea}>
                   <h3 className={styles.statValue}>{stat.value}</h3>
                   <span className={`${styles.statChange} ${stat.trend === 'up' ? styles.up : styles.down}`}>
                      {stat.trend === 'up' ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                      {stat.change}
                   </span>
                </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Charts & Tables Section */}
      <div className={styles.mainGrid}>
        {/* Revenue Chart */}
        <Card className={styles.chartCard} glass>
            <div className={styles.cardHeader}>
                <h3>Revenue Trends (Last 7 Months)</h3>
                <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={REVENUE_DATA}>
                        <defs>
                            <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.1}/>
                                <stop offset="95%" stopColor="var(--primary)" stopOpacity={0}/>
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--card-border)" />
                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: 'var(--secondary)'}} />
                        <YAxis axisLine={false} tickLine={false} tick={{fill: 'var(--secondary)'}} />
                        <Tooltip />
                        <Area type="monotone" dataKey="revenue" stroke="var(--primary)" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </Card>

        {/* Recent Orders */}
        <Card className={styles.tableCard} glass>
            <div className={styles.cardHeader}>
                <h3>Recent Orders</h3>
                <button className={styles.viewAll}>View Details <ExternalLink size={16} /></button>
            </div>
            <div className={styles.tableWrapper}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Order ID</th>
                            <th>Customer Name</th>
                            <th>Status</th>
                            <th>Total</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {RECENT_ORDERS.map((order, idx) => (
                            <tr key={idx}>
                                <td className={styles.orderId}>{order.id}</td>
                                <td className={styles.customerName}>{order.customer}</td>
                                <td>
                                    <span className={`${styles.badge} ${styles[order.status.toLowerCase()]}`}>
                                        {order.status}
                                    </span>
                                </td>
                                <td className={styles.price}>{order.total}</td>
                                <td>
                                    <button className={styles.manageBtn}>Manage</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </Card>
      </div>

      {/* Footer Info */}
      <footer className={styles.footer}>
         <p>&copy; 2026 E-Commerce Master | Powered by Advanced Admin Panel</p>
      </footer>
    </div>
  );
}
