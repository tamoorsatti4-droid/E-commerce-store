'use client';

import React, { useState, useEffect } from 'react';
import styles from './page.module.css';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { db, storage } from '@/lib/firebase';
import { collection, query, orderBy, onSnapshot, doc, addDoc, updateDoc, deleteDoc, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { 
  Package, 
  Plus, 
  Search, 
  Edit2, 
  Trash2, 
  MoreVertical, 
  X, 
  Upload, 
  CheckCircle,
  AlertCircle
} from 'lucide-react';

const CATEGORIES = ['Mobiles', 'Laptops', 'Audio', 'Watches', 'Accessories'];

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  
  // Form State
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    oldPrice: '',
    category: 'Mobiles',
    description: '',
    stock: '',
    image: null,
    rating: 5,
    reviews: 0
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const q = query(collection(db, 'products'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const productsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setProducts(productsData);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({ ...prev, image: file }));
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleOpenModal = (product = null) => {
    if (product) {
      setEditingProduct(product);
      setFormData({
        name: product.name,
        price: product.price,
        oldPrice: product.oldPrice || '',
        category: product.category,
        description: product.description,
        stock: product.stock,
        image: null,
        rating: product.rating || 5,
        reviews: product.reviews || 0
      });
      setImagePreview(product.image);
    } else {
      setEditingProduct(null);
      setFormData({
        name: '',
        price: '',
        oldPrice: '',
        category: 'Mobiles',
        description: '',
        stock: '',
        image: null,
        rating: 5,
        reviews: 0
      });
      setImagePreview(null);
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      let imageUrl = editingProduct ? editingProduct.image : '';

      // Upload new image if provided
      if (formData.image) {
        const storageRef = ref(storage, `products/${Date.now()}_${formData.image.name}`);
        const snapshot = await uploadBytes(storageRef, formData.image);
        imageUrl = await getDownloadURL(snapshot.ref);
      }

      const productData = {
        name: formData.name,
        price: Number(formData.price),
        oldPrice: formData.oldPrice ? Number(formData.oldPrice) : null,
        category: formData.category,
        description: formData.description,
        stock: Number(formData.stock),
        image: imageUrl,
        rating: Number(formData.rating),
        reviews: Number(formData.reviews),
        updatedAt: serverTimestamp()
      };

      if (editingProduct) {
        await updateDoc(doc(db, 'products', editingProduct.id), productData);
      } else {
        await addDoc(collection(db, 'products'), {
          ...productData,
          createdAt: serverTimestamp()
        });
      }

      setIsModalOpen(false);
    } catch (error) {
      console.error("Error saving product: ", error);
      alert("Failed to save product.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this product?")) {
      try {
        await deleteDoc(doc(db, 'products', id));
      } catch (error) {
        console.error("Error deleting product: ", error);
      }
    }
  };

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Product Management</h1>
          <p className={styles.subtitle}>Add, edit, and manage your inventory and stock.</p>
        </div>
        <Button onClick={() => handleOpenModal()} className={styles.addBtn}>
            <Plus size={20} /> Add New Product
        </Button>
      </div>

      <div className={styles.filtersArea}>
        <div className={styles.searchBar}>
            <Search size={20} />
            <input 
              type="text" 
              placeholder="Search products by name or category..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
        </div>
      </div>

      <Card className={styles.tableCard} glass>
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Product</th>
                <th>Category</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product) => (
                <tr key={product.id}>
                  <td>
                    <div className={styles.productInfo}>
                        <img src={product.image} alt={product.name} className={styles.productImg} />
                        <div className={styles.productText}>
                            <strong>{product.name}</strong>
                            <span>ID: #{product.id.slice(-6).toUpperCase()}</span>
                        </div>
                    </div>
                  </td>
                  <td>
                    <span className={styles.categoryBadge}>{product.category}</span>
                  </td>
                  <td className={styles.price}>Rs. {product.price.toLocaleString()}</td>
                  <td>
                    <div className={`${styles.stockBadge} ${product.stock < 10 ? styles.lowStock : styles.inStock}`}>
                        {product.stock} in stock
                        {product.stock < 10 && <AlertCircle size={14} />}
                    </div>
                  </td>
                  <td>
                    <div className={styles.actions}>
                        <button className={styles.editBtn} onClick={() => handleOpenModal(product)}>
                            <Edit2 size={18} />
                        </button>
                        <button className={styles.deleteBtn} onClick={() => handleDelete(product.id)}>
                            <Trash2 size={18} />
                        </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredProducts.length === 0 && !loading && (
            <div className={styles.noResults}>No products found.</div>
          )}
        </div>
      </Card>

      {/* Add / Edit Modal */}
      {isModalOpen && (
        <div className={styles.modalOverlay} onClick={() => setIsModalOpen(false)}>
          <div className={styles.modal} onClick={e => e.stopPropagation()}>
            <div className={styles.modalHeader}>
                <h2>{editingProduct ? 'Edit Product' : 'Add New Product'}</h2>
                <button className={styles.closeBtn} onClick={() => setIsModalOpen(false)}><X size={24} /></button>
            </div>

            <form className={styles.modalContent} onSubmit={handleSubmit}>
                <div className={styles.modalGrid}>
                    {/* Left: Basic Info */}
                    <div className={styles.formFields}>
                        <Input 
                          label="Product Name" 
                          name="name" 
                          value={formData.name} 
                          onChange={handleInputChange} 
                          required 
                        />
                        <div className={styles.row}>
                            <Input 
                              label="Price (Rs.)" 
                              name="price" 
                              type="number" 
                              value={formData.price} 
                              onChange={handleInputChange} 
                              required 
                            />
                            <Input 
                              label="Old Price (Optional)" 
                              name="oldPrice" 
                              type="number" 
                              value={formData.oldPrice} 
                              onChange={handleInputChange} 
                            />
                        </div>
                        <div className={styles.field}>
                            <label>Category</label>
                            <select 
                                name="category" 
                                value={formData.category} 
                                onChange={handleInputChange} 
                                className={styles.select}
                            >
                                {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                            </select>
                        </div>
                        <Input 
                          label="Stock Quantity" 
                          name="stock" 
                          type="number" 
                          value={formData.stock} 
                          onChange={handleInputChange} 
                          required 
                        />
                        <div className={styles.field}>
                            <label>Description</label>
                            <textarea 
                              name="description" 
                              value={formData.description} 
                              onChange={handleInputChange} 
                              className={styles.textarea}
                              required
                            />
                        </div>
                    </div>

                    {/* Right: Media */}
                    <div className={styles.mediaFields}>
                        <h3>Product Media</h3>
                        <div className={styles.uploadBox}>
                            {imagePreview ? (
                                <div className={styles.previewContainer}>
                                    <img src={imagePreview} alt="Preview" />
                                    <button type="button" className={styles.removeImg} onClick={() => { setImagePreview(null); setFormData(p => ({...p, image: null})); }}>
                                        <X size={16} />
                                    </button>
                                </div>
                            ) : (
                                <label className={styles.uploadLabel}>
                                    <Upload size={32} />
                                    <span>Upload Image</span>
                                    <input type="file" onChange={handleFileChange} accept="image/*" className={styles.fileInput} />
                                </label>
                            )}
                        </div>
                        <p className={styles.uploadNote}>Recommended: Square image, high resolution.</p>
                        
                        <div className={styles.modalActions}>
                            <Button variant="ghost" onClick={() => setIsModalOpen(false)}>Cancel</Button>
                            <Button type="submit" loading={submitting}>
                                {editingProduct ? 'Update Product' : 'Save Product'}
                            </Button>
                        </div>
                    </div>
                </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
