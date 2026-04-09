'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Card from '@/components/ui/Card';
import styles from './page.module.css';
import { Lock, Mail, ArrowRight, ShieldCheck } from 'lucide-react';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login } = useAuth();
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await login(email, password);
      router.push('/admin');
    } catch (err) {
      console.error(err);
      setError('Invalid credentials. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.circles}>
          <div className={styles.circle1}></div>
          <div className={styles.circle2}></div>
      </div>

      <Card glass className={styles.loginCard}>
        <div className={styles.header}>
            <div className={styles.logoIcon}>E</div>
            <h1>Admin Panel</h1>
            <p>Welcome back! Please login to your account.</p>
        </div>

        <form onSubmit={handleLogin} className={styles.form}>
            {error && <div className={styles.error}>{error}</div>}
            
            <Input 
                label="Email Address"
                type="email"
                placeholder="admin@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                icon={<Mail size={20} />}
            />

            <Input 
                label="Password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                icon={<Lock size={20} />}
            />

            <div className={styles.forgot}>
                <a href="#">Forgot Password?</a>
            </div>

            <Button type="submit" loading={loading} className={styles.loginBtn}>
                Login to Dashboard <ArrowRight size={20} />
            </Button>
        </form>

        <div className={styles.footer}>
            <ShieldCheck size={16} />
            <span>Secure Admin Access Only</span>
        </div>
      </Card>
    </div>
  );
}
