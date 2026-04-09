'use client';

import React, { useState, useEffect } from 'react';
import styles from './page.module.css';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { db } from '@/lib/firebase';
import { collection, query, orderBy, onSnapshot, doc, updateDoc } from 'firebase/firestore';
import { 
  ShoppingBag, 
  Search, 
  Filter, 
  ExternalLink, 
  CheckCircle, 
  XCircle, 
  Eye, 
  Calendar,
  User,
  CreditCard,
  MapPin
} from 'lucide-react';

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    const q = query(collection(db, 'orders'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const ordersData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setOrders(ordersData);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleUpdateStatus = async (orderId, newStatus) => {
    try {
      await updateDoc(doc(db, 'orders', orderId), {
        status: newStatus
      });
      setSelectedOrder(null);
    } catch (error) {
      console.error("Error updating order status: ", error);
      alert("Failed to update order status.");
    }
  };

  const filteredOrders = orders.filter(order => {
    const matchStatus = statusFilter === 'All' || order.status === statusFilter;
    const matchSearch = order.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                        order.id.toLowerCase().includes(searchTerm.toLowerCase());
    return matchStatus && matchSearch;
  });

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Order Management</h1>
          <p className={styles.subtitle}>View, verify payments, and manage your store's orders.</p>
        </div>
      </div>

      {/* Filters Area */}
      <div className={styles.filtersArea}>
        <div className={styles.searchBar}>
            <Search size={20} />
            <input 
              type="text" 
              placeholder="Search by Order ID or Customer Name..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
        </div>

        <div className={styles.filterBtns}>
            {['All', 'Pending', 'Paid', 'Processing', 'Delivered', 'Rejected'].map(status => (
                <button 
                  key={status} 
                  className={`${styles.filterBtn} ${statusFilter === status ? styles.activeFilter : ''}`}
                  onClick={() => setStatusFilter(status)}
                >
                    {status}
                </button>
            ))}
        </div>
      </div>

      {/* Orders Table */}
      <Card className={styles.tableCard} glass>
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Date</th>
                <th>Payment</th>
                <th>Total</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <tr key={order.id}>
                  <td className={styles.orderId}>#{order.id.slice(-6).toUpperCase()}</td>
                  <td>
                    <div className={styles.customerInfo}>
                        <strong>{order.customer.name}</strong>
                        <span>{order.customer.phone}</span>
                    </div>
                  </td>
                  <td className={styles.date}>
                    {order.createdAt?.toDate().toLocaleDateString()}
                  </td>
                  <td className={styles.payment}>
                    <span className={styles.methodBadge}>{order.paymentMethod}</span>
                  </td>
                  <td className={styles.price}>Rs. {order.total.toLocaleString()}</td>
                  <td>
                    <span className={`${styles.statusBadge} ${styles[order.status.toLowerCase()]}`}>
                        {order.status}
                    </span>
                  </td>
                  <td>
                    <button className={styles.viewBtn} onClick={() => setSelectedOrder(order)}>
                        <Eye size={18} /> View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredOrders.length === 0 && !loading && (
            <div className={styles.noResults}>No orders found.</div>
          )}
        </div>
      </Card>

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className={styles.modalOverlay} onClick={() => setSelectedOrder(null)}>
          <div className={styles.modal} onClick={e => e.stopPropagation()}>
            <div className={styles.modalHeader}>
                <h2>Order Details: #{selectedOrder.id.slice(-6).toUpperCase()}</h2>
                <button className={styles.closeBtn} onClick={() => setSelectedOrder(null)}><XCircle size={24} /></button>
            </div>

            <div className={styles.modalContent}>
                <div className={styles.modalGrid}>
                    {/* Left: Info */}
                    <div className={styles.orderInfo}>
                        <div className={styles.infoSection}>
                            <h3><User size={18} /> Customer Details</h3>
                            <p><strong>Name:</strong> {selectedOrder.customer.name}</p>
                            <p><strong>Phone:</strong> {selectedOrder.customer.phone}</p>
                            <p><strong>Address:</strong> {selectedOrder.customer.address}, {selectedOrder.customer.city}</p>
                        </div>

                        <div className={styles.infoSection}>
                            <h3><CreditCard size={18} /> Payment Info</h3>
                            <p><strong>Method:</strong> {selectedOrder.paymentMethod}</p>
                            <p><strong>Total Amount:</strong> Rs. {selectedOrder.total.toLocaleString()}</p>
                            <p><strong>Status:</strong> <span className={styles.statusBadge}>{selectedOrder.status}</span></p>
                        </div>

                        <div className={styles.infoSection}>
                            <h3>Order Items</h3>
                            <div className={styles.itemList}>
                                {selectedOrder.items.map((item, idx) => (
                                    <div key={idx} className={styles.item}>
                                        <span>{item.name} x {item.quantity}</span>
                                        <span>Rs. {(item.price * item.quantity).toLocaleString()}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right: Payment Proof */}
                    <div className={styles.proofArea}>
                        <h3>Payment Proof Screenshot</h3>
                        {selectedOrder.paymentProof ? (
                             <div className={styles.screenshot}>
                                <a href={selectedOrder.paymentProof} target="_blank">
                                    <img src={selectedOrder.paymentProof} alt="Payment Proof" />
                                </a>
                                <p>Click image to view full size</p>
                             </div>
                        ) : (
                            <div className={styles.noProof}>No screenshot uploaded</div>
                        )}

                        <div className={styles.modalActions}>
                            <Button variant="danger" onClick={() => handleUpdateStatus(selectedOrder.id, 'Rejected')}>
                                Reject Order
                            </Button>
                            <Button onClick={() => handleUpdateStatus(selectedOrder.id, 'Paid')}>
                                Approve Payment
                            </Button>
                            <Button variant="outline" onClick={() => handleUpdateStatus(selectedOrder.id, 'Delivered')}>
                                Mark Delivered
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
