"use client";
import React, { createContext, useContext, useState, useEffect } from "react";

export interface CartItem {
  productId: number;
  nameEn: string;
  nameUr: string;
  price: number;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (productId: number) => void;
  clearCart: () => void;
  lang: "en" | "ur";
  toggleLang: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [lang, setLang] = useState<"en" | "ur">("en");

  // Load cart from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("cart");
    if (saved) setItems(JSON.parse(saved));
    const savedLang = localStorage.getItem("lang");
    if (savedLang === "ur" || savedLang === "en") setLang(savedLang);
  }, []);

  // Save changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(items));
    localStorage.setItem("lang", lang);
    document.documentElement.dir = lang === "ur" ? "rtl" : "ltr";
  }, [items, lang]);

  const addToCart = (product: CartItem) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.productId === product.productId);
      if (existing) {
        return prev.map((i) =>
          i.productId === product.productId
            ? { ...i, quantity: i.quantity + product.quantity }
            : i
        );
      }
      return [...prev, product];
    });
  };

  const removeFromCart = (productId: number) => {
    setItems((prev) => prev.filter((i) => i.productId !== productId));
  };

  const clearCart = () => setItems([]);

  const toggleLang = () => {
    setLang(lang === "en" ? "ur" : "en");
  };

  return (
    <CartContext.Provider
      value={{ items, addToCart, removeFromCart, clearCart, lang, toggleLang }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
}
