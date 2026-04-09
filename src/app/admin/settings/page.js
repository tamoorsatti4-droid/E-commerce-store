'use client';

import React, { useState, useEffect } from 'react';
import styles from './page.module.css';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { db } from '@/lib/firebase';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { Settings, CreditCard, Save, RefreshCcw, Smartphone, Landmark, Bell } from 'lucide-react';

export default function AdminSettings() {
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [settings, setSettings] = useState({
    easypaisaName: '',
    easypaisaNumber: '',
    jazzcashName: '',
    jazzcashNumber: '',
    bankName: '',
    bankAccountTitle: '',
    bankIBAN: '',
    shippingFee: 0,
    notificationEmail: ''
  });

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const docRef = doc(db, 'settings', 'payment_details');
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          setSettings(docSnap.data());
        }
      } catch (error) {
        console.error("Error fetching settings: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSettings(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      await setDoc(doc(db, 'settings', 'payment_details'), {
        ...settings,
        updatedAt: serverTimestamp()
      });
      alert('Settings updated successfully!');
    } catch (error) {
      console.error("Error saving settings: ", error);
      alert('Failed to save settings.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div className={styles.loading}>Loading configurations...</div>;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Store Settings</h1>
          <p className={styles.subtitle}>Manage your store's payment details and general configurations.</p>
        </div>
      </div>

      <form className={styles.grid} onSubmit={handleSave}>
        {/* Payment Methods Section */}
        <div className={styles.section}>
            <div className={styles.sectionHeader}>
                <CreditCard size={24} color="var(--primary)" />
                <h2>Manual Payment Details</h2>
            </div>
            
            <div className={styles.cardsRow}>
                {/* EasyPaisa */}
                <Card className={styles.card} glass>
                    <div className={styles.cardTitle}>
                        <Smartphone size={20} />
                        <h3>EasyPaisa Details</h3>
                    </div>
                    <div className={styles.formGroup}>
                        <Input 
                            label="Account Holder Name" 
                            name="easypaisaName" 
                            value={settings.easypaisaName} 
                            onChange={handleInputChange} 
                        />
                        <Input 
                            label="EasyPaisa Mobile Number" 
                            name="easypaisaNumber" 
                            value={settings.easypaisaNumber} 
                            onChange={handleInputChange} 
                        />
                    </div>
                </Card>

                {/* JazzCash */}
                <Card className={styles.card} glass>
                    <div className={styles.cardTitle}>
                        <Smartphone size={20} />
                        <h3>JazzCash Details</h3>
                    </div>
                    <div className={styles.formGroup}>
                        <Input 
                            label="Account Holder Name" 
                            name="jazzcashName" 
                            value={settings.jazzcashName} 
                            onChange={handleInputChange} 
                        />
                        <Input 
                            label="JazzCash Mobile Number" 
                            name="jazzcashNumber" 
                            value={settings.jazzcashNumber} 
                            onChange={handleInputChange} 
                        />
                    </div>
                </Card>

                {/* Bank Transfer */}
                <Card className={styles.card} glass>
                    <div className={styles.cardTitle}>
                        <Landmark size={20} />
                        <h3>Bank Account Details</h3>
                    </div>
                    <div className={styles.formGroup}>
                        <Input 
                            label="Bank Name" 
                            name="bankName" 
                            value={settings.bankName} 
                            onChange={handleInputChange} 
                        />
                        <Input 
                            label="Account Title" 
                            name="bankAccountTitle" 
                            value={settings.bankAccountTitle} 
                            onChange={handleInputChange} 
                        />
                        <Input 
                            label="IBAN / Account Number" 
                            name="bankIBAN" 
                            value={settings.bankIBAN} 
                            onChange={handleInputChange} 
                        />
                    </div>
                </Card>
            </div>
        </div>

        {/* General Store Settings */}
        <Card className={styles.fullCard} glass>
            <div className={styles.sectionHeader}>
                <Settings size={24} color="var(--primary)" />
                <h2>General Store Settings</h2>
            </div>
            <div className={styles.row}>
                <Input 
                    label="Default Shipping Fee (Rs.)" 
                    name="shippingFee" 
                    type="number" 
                    value={settings.shippingFee} 
                    onChange={handleInputChange} 
                />
                <Input 
                    label="Admin Notification Email" 
                    name="notificationEmail" 
                    type="email" 
                    value={settings.notificationEmail} 
                    onChange={handleInputChange} 
                    placeholder="Where to send new order alerts"
                />
            </div>
            <p className={styles.note}>
                <Bell size={14} /> 
                These settings will reflect immediately on the customer checkout page.
            </p>
        </Card>

        <div className={styles.formActions}>
            <Button variant="outline" type="button" onClick={() => window.location.reload()}>
                <RefreshCcw size={18} /> Discard Changes
            </Button>
            <Button type="submit" loading={submitting}>
                <Save size={18} /> Save Settings
            </Button>
        </div>
      </form>
    </div>
  );
}
