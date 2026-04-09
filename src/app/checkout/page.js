'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Card from '@/components/ui/Card';
import { useCart } from '@/context/CartContext';
import styles from './page.module.css';
import { CheckCircle, CreditCard, Upload, Phone, MapPin, User, ChevronRight, ArrowLeft, Package } from 'lucide-react';
import { db, storage } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useRouter } from 'next/navigation';

export default function CheckoutPage() {
  const { cartItems, getCartTotal, clearCart } = useCart();
  const router = useRouter();
  
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const [settings, setSettings] = useState(null);

  // Form States
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    city: '',
    paymentMethod: 'EasyPaisa', // Default
    proofImage: null
  });

  const [previewUrl, setPreviewUrl] = useState(null);

  // Fetch Payment Settings
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const docRef = doc(db, 'settings', 'payment_details');
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setSettings(docSnap.data());
        }
      } catch (error) {
        console.error("Error fetching payment settings: ", error);
      }
    };
    fetchSettings();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({ ...prev, proofImage: file }));
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const nextStep = () => setStep(s => s + 1);
  const prevStep = () => setStep(s => s - 1);

  const handleSubmitOrder = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let proofUrl = '';
      
      // 1. Upload proof if exists
      if (formData.proofImage) {
        const storageRef = ref(storage, `payment_proofs/${Date.now()}_${formData.proofImage.name}`);
        const snapshot = await uploadBytes(storageRef, formData.proofImage);
        proofUrl = await getDownloadURL(snapshot.ref);
      }

      // 2. Create Order in Firestore
      const orderData = {
        customer: {
          name: formData.name,
          phone: formData.phone,
          address: formData.address,
          city: formData.city
        },
        items: cartItems,
        total: getCartTotal(),
        paymentMethod: formData.paymentMethod,
        paymentProof: proofUrl,
        status: 'Pending',
        createdAt: serverTimestamp()
      };

      const docRef = await addDoc(collection(db, 'orders'), orderData);
      setOrderId(docRef.id);
      setStep(4); // Success step
      clearCart();
    } catch (error) {
      console.error("Error submitting order: ", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (cartItems.length === 0 && step !== 4) {
    router.push('/cart');
    return null;
  }

  return (
    <main className={styles.main}>
      <Navbar />
      
      <div className={styles.container}>
        {/* Progress Bar */}
        <div className={styles.progressBar}>
           {[1, 2, 3].map(i => (
             <React.Fragment key={i}>
                <div className={`${styles.stepDot} ${step >= i ? styles.activeDot : ''}`}>
                    {step > i ? <CheckCircle size={20} /> : i}
                </div>
                {i < 3 && <div className={`${styles.line} ${step > i ? styles.activeLine : ''}`} />}
             </React.Fragment>
           ))}
        </div>

        <div className={styles.grid}>
          {/* Main Form Area */}
          <div className={styles.formContainer}>
            {step === 1 && (
                <div className={styles.stepContent}>
                    <h2><User size={24} /> Customer Information</h2>
                    <p>Enter your delivery details below</p>
                    <form className={styles.form} onSubmit={(e) => { e.preventDefault(); nextStep(); }}>
                        <Input 
                            label="Full Name" 
                            name="name" 
                            value={formData.name} 
                            onChange={handleInputChange} 
                            required 
                            placeholder="e.g. Ahmad Khan" 
                        />
                        <Input 
                            label="Phone Number" 
                            name="phone" 
                            value={formData.phone} 
                            onChange={handleInputChange} 
                            required 
                            placeholder="e.g. 0300 1234567" 
                            type="tel"
                        />
                        <div className={styles.row}>
                            <Input 
                                label="City" 
                                name="city" 
                                value={formData.city} 
                                onChange={handleInputChange} 
                                required 
                                placeholder="e.g. Lahore" 
                            />
                        </div>
                        <Input 
                            label="Complete Address" 
                            name="address" 
                            value={formData.address} 
                            onChange={handleInputChange} 
                            required 
                            placeholder="Street, House No, Area..." 
                        />
                        <Button type="submit" className={styles.nextBtn}>
                            Continue to Payment <ChevronRight size={20} />
                        </Button>
                    </form>
                </div>
            )}

            {step === 2 && (
                <div className={styles.stepContent}>
                    <h2><CreditCard size={24} /> Payment Method</h2>
                    <p>Select your preferred manual payment method</p>
                    
                    <div className={styles.paymentOptions}>
                        {['EasyPaisa', 'JazzCash', 'Bank Transfer'].map(method => (
                            <div 
                                key={method} 
                                className={`${styles.paymentCard} ${formData.paymentMethod === method ? styles.activePayment : ''}`}
                                onClick={() => setFormData(prev => ({ ...prev, paymentMethod: method }))}
                            >
                                <div className={styles.radio} />
                                <span>{method}</span>
                            </div>
                        ))}
                    </div>

                    <div className={styles.btns}>
                        <Button variant="ghost" onClick={prevStep}><ArrowLeft size={18} /> Back</Button>
                        <Button onClick={nextStep}>View Instructions <ChevronRight size={20} /></Button>
                    </div>
                </div>
            )}

            {step === 3 && (
                <div className={styles.stepContent}>
                    <h2><Package size={24} /> Complete Your Order</h2>
                    <p>Follow instructions to pay and upload proof</p>

                    <Card className={styles.instructionCard}>
                        <h3>Payment Instructions</h3>
                        <div className={styles.instructionItem}>
                            <strong>Account Name:</strong> {settings?.easypaisaName || 'E-Commerce Master'}
                        </div>
                        {formData.paymentMethod === 'EasyPaisa' && (
                            <div className={styles.instructionItem}>
                                <strong>EasyPaisa Number:</strong> {settings?.easypaisaNumber || '0300-1122334'}
                            </div>
                        )}
                        {formData.paymentMethod === 'JazzCash' && (
                            <div className={styles.instructionItem}>
                                <strong>JazzCash Number:</strong> {settings?.jazzcashNumber || '0311-2233445'}
                            </div>
                        )}
                        {formData.paymentMethod === 'Bank Transfer' && (
                            <>
                                <div className={styles.instructionItem}>
                                    <strong>Bank:</strong> {settings?.bankName || 'Meezan Bank'}
                                </div>
                                <div className={styles.instructionItem}>
                                    <strong>Account Title:</strong> {settings?.bankAccountTitle || 'Admin User'}
                                </div>
                                <div className={styles.instructionItem}>
                                    <strong>IBAN:</strong> {settings?.bankIBAN || 'PK00MEZN0011223344556677'}
                                </div>
                            </>
                        )}
                        <p className={styles.warningNote}>
                            * Please transfer exactly <strong>Rs. {(getCartTotal() + Number(settings?.shippingFee || 0)).toLocaleString()}</strong> and upload the screenshot below.
                        </p>
                    </Card>

                    <div className={styles.uploadArea}>
                        <label className={styles.uploadLabel}>
                            <Upload size={32} />
                            <span>Upload Payment Screenshot</span>
                            <input type="file" onChange={handleFileChange} accept="image/*" className={styles.fileInput} />
                        </label>
                        {previewUrl && (
                            <div className={styles.preview}>
                                <img src={previewUrl} alt="Proof Preview" />
                            </div>
                        )}
                    </div>

                    <div className={styles.btns}>
                        <Button variant="ghost" onClick={prevStep}><ArrowLeft size={18} /> Back</Button>
                        <Button onClick={handleSubmitOrder} loading={loading} disabled={!formData.proofImage}>
                            Confirm Order
                        </Button>
                    </div>
                </div>
            )}

            {step === 4 && (
                <div className={styles.successStep}>
                    <div className={styles.successIcon}>
                        <CheckCircle size={80} />
                    </div>
                    <h1>Order Placed Successfully!</h1>
                    <p>Your order ID is <strong>#{orderId?.slice(-6).toUpperCase()}</strong></p>
                    <p className={styles.subtext}>
                        Our admin will verify your payment and update the status within 24 hours.
                    </p>
                    <Link href="/">
                        <Button size="lg">Return to Home</Button>
                    </Link>
                </div>
            )}
          </div>

          {/* Sidebar Order Summary */}
          {step < 4 && (
            <div className={styles.summarySidebar}>
                <Card glass className={styles.summaryCard}>
                    <h3>Order Summary</h3>
                    <div className={styles.itemList}>
                        {cartItems.map(item => (
                            <div key={item.id} className={styles.summaryItem}>
                                <span>{item.name} x {item.quantity}</span>
                                <span>Rs. {(item.price * item.quantity).toLocaleString()}</span>
                            </div>
                        ))}
                    </div>
                    <div className={styles.totalRow}>
                        <span>Total Amount</span>
                        <span>Rs. {(getCartTotal() + Number(settings?.shippingFee || 0)).toLocaleString()}</span>
                    </div>
                </Card>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
