"use client";

import Link from "next/link";
import { useCart } from "@/components/CartContext";
import styles from "./page.module.css";

// ── Small Win2k icon SVGs ────────────────────────────────────────────────────

function CartIcon() {
  return (
    <svg
      className={styles.titleBarIcon}
      viewBox="0 0 16 16"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="1" y="3" width="14" height="2" fill="#ffe066" />
      <rect x="2" y="5" width="10" height="6" fill="#ffe066" stroke="#666" strokeWidth="0.5" />
      <rect x="4" y="12" width="2" height="2" rx="1" fill="#444" />
      <rect x="9" y="12" width="2" height="2" rx="1" fill="#444" />
      <polyline points="1,3 3,5 12,5 14,3" fill="none" stroke="#888" strokeWidth="0.5" />
    </svg>
  );
}

function FolderIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
      <rect x="1" y="5" width="14" height="9" fill="#ffe066" stroke="#999" strokeWidth="0.5" />
      <rect x="1" y="4" width="6" height="2" fill="#ffe066" stroke="#999" strokeWidth="0.5" />
    </svg>
  );
}

function TrashIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
      <rect x="4" y="4" width="8" height="10" fill="#ccc" stroke="#888" strokeWidth="0.5" />
      <rect x="2" y="3" width="12" height="2" fill="#aaa" stroke="#888" strokeWidth="0.5" />
      <rect x="5" y="1" width="6" height="2" fill="#aaa" stroke="#888" strokeWidth="0.5" />
      <line x1="6" y1="6" x2="6" y2="12" stroke="#888" strokeWidth="0.7" />
      <line x1="8" y1="6" x2="8" y2="12" stroke="#888" strokeWidth="0.7" />
      <line x1="10" y1="6" x2="10" y2="12" stroke="#888" strokeWidth="0.7" />
    </svg>
  );
}

function CheckoutIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
      <rect x="1" y="3" width="14" height="10" fill="#fff" stroke="#666" strokeWidth="0.5" />
      <line x1="1" y1="6" x2="15" y2="6" stroke="#666" strokeWidth="0.5" />
      <rect x="3" y="8" width="5" height="1" fill="#00c" />
      <rect x="3" y="10" width="8" height="1" fill="#ccc" />
    </svg>
  );
}

// ── Main Cart Page ────────────────────────────────────────────────────────────

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, clearCart, lang } = useCart();

  const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const tax = Math.round(subtotal * 0.17);
  const total = subtotal + tax;

  const incrementQty = (item: typeof items[0]) => {
    updateQuantity(item.productId, 1);
  };

  const decrementQty = (item: typeof items[0]) => {
    updateQuantity(item.productId, -1);
  };

  const itemCount = items.reduce((s, i) => s + i.quantity, 0);

  return (
    <div className={styles.desktop}>
      {/* ── Window ── */}
      <div className={styles.window} role="main">

        {/* Title bar */}
        <div className={styles.titleBar}>
          <div className={styles.titleBarLeft}>
            <CartIcon />
            <span className={styles.titleBarText}>
              {lang === "en"
                ? "Shopping Cart - MyStore"
                : "ٹوکری - میرا سٹور"}
            </span>
          </div>
          <div className={styles.titleBarButtons}>
            <button className={styles.winBtn} aria-label="Minimize">_</button>
            <button className={styles.winBtn} aria-label="Maximize">□</button>
            <Link href="/" className={styles.winBtn} aria-label="Close" style={{ textDecoration: "none" }}>✕</Link>
          </div>
        </div>

        {/* Menu bar */}
        <div className={styles.menuBar} role="menubar">
          {["File", "Edit", "View", "Favorites", "Tools", "Help"].map((m) => (
            <span key={m} className={styles.menuItem} role="menuitem">{m}</span>
          ))}
        </div>

        {/* Toolbar */}
        <div className={styles.toolbar}>
          <Link href="/" aria-label="Go Back">
            <button className={styles.pushBtn} style={{ minWidth: 60, fontSize: 11 }}>
              ← Back
            </button>
          </Link>
          <button className={styles.pushBtn} style={{ minWidth: 60, fontSize: 11 }} disabled>
            Forward →
          </button>
          <div className={styles.toolbarSep} />
          <button
            className={styles.pushBtn}
            style={{ minWidth: 60, fontSize: 11 }}
            onClick={() => window.location.reload()}
          >
            ↻ Refresh
          </button>
          <div className={styles.toolbarSep} />
          <Link href="/" aria-label="Go Home">
            <button className={styles.pushBtn} style={{ minWidth: 60, fontSize: 11 }}>
              🏠 Home
            </button>
          </Link>
        </div>

        {/* Address bar */}
        <div className={styles.addressBar}>
          <span className={styles.addressLabel}>Address</span>
          <div className={styles.addressInput}>http://mystore.local/cart</div>
        </div>

        {/* Body */}
        <div className={styles.windowBody}>
          <div className={styles.row}>

            {/* ── Left: Explorer nav pane ── */}
            <div className={styles.sidePanel}>
              <div className={styles.navPane}>
                <div className={styles.navPaneTitle}>Cart Tasks</div>
                <div
                  className={styles.navLink}
                  onClick={clearCart}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === "Enter" && clearCart()}
                >
                  <TrashIcon size={13} />
                  {lang === "en" ? "Empty Cart" : "ٹوکری خالی کریں"}
                </div>
                <Link href="/" className={styles.navLink}>
                  <FolderIcon size={13} />
                  {lang === "en" ? "Continue Shopping" : "خریداری جاری رکھیں"}
                </Link>
              </div>

              <div style={{ marginTop: 8 }}>
                <div className={styles.navPane}>
                  <div className={styles.navPaneTitle}>Other Places</div>
                  <Link href="/" className={styles.navLink}>
                    <FolderIcon size={13} /> {lang === "en" ? "Store Home" : "سٹور"}
                  </Link>
                  <Link href="/admin" className={styles.navLink}>
                    <FolderIcon size={13} /> {lang === "en" ? "Admin Panel" : "ایڈمن"}
                  </Link>
                </div>
              </div>
            </div>

            {/* ── Right: Main content ── */}
            <div className={styles.col}>

              {/* Cart items panel */}
              <div className={styles.panel}>
                <div className={styles.panelInner}>
                  <div className={styles.panelHeader}>
                    <CartIcon />
                    {lang === "en"
                      ? `Cart Contents (${itemCount} item${itemCount !== 1 ? "s" : ""})`
                      : `ٹوکری کا مواد (${itemCount})`}
                  </div>

                  {items.length === 0 ? (
                    <div className={styles.emptyState}>
                      <div className={styles.emptyIcon}>🛒</div>
                      <p className={styles.emptyText}>
                        {lang === "en"
                          ? "Your cart is empty. Add items from the store."
                          : "آپ کی ٹوکری خالی ہے۔"}
                      </p>
                      <Link href="/">
                        <button className={styles.pushBtn}>
                          {lang === "en" ? "Browse Store" : "سٹور دیکھیں"}
                        </button>
                      </Link>
                    </div>
                  ) : (
                    <table className={styles.listView}>
                      <thead>
                        <tr>
                          <th style={{ width: 24 }}></th>
                          <th>{lang === "en" ? "Product Name" : "نام"}</th>
                          <th style={{ width: 80 }}>{lang === "en" ? "Unit Price" : "قیمت"}</th>
                          <th style={{ width: 110 }}>{lang === "en" ? "Quantity" : "تعداد"}</th>
                          <th style={{ width: 90 }}>{lang === "en" ? "Subtotal" : "رقم"}</th>
                          <th style={{ width: 60 }}>{lang === "en" ? "Remove" : "ہٹائیں"}</th>
                        </tr>
                      </thead>
                      <tbody>
                        {items.map((item) => (
                          <tr key={item.productId}>
                            <td>
                              <CartIcon />
                            </td>
                            <td>
                              {lang === "en" ? item.nameEn : item.nameUr}
                            </td>
                            <td>Rs. {item.price.toLocaleString()}</td>
                            <td>
                              <div className={styles.qtyControl}>
                                <button
                                  className={styles.qtyBtn}
                                  onClick={() => decrementQty(item)}
                                  aria-label="Decrease quantity"
                                >
                                  −
                                </button>
                                <span className={styles.qtyValue}>{item.quantity}</span>
                                <button
                                  className={styles.qtyBtn}
                                  onClick={() => incrementQty(item)}
                                  aria-label="Increase quantity"
                                >
                                  +
                                </button>
                              </div>
                            </td>
                            <td>Rs. {(item.price * item.quantity).toLocaleString()}</td>
                            <td>
                              <button
                                className={styles.iconBtn}
                                onClick={() => removeFromCart(item.productId)}
                                aria-label={`Remove ${item.nameEn}`}
                              >
                                <TrashIcon size={13} />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              </div>

              {/* Order summary */}
              {items.length > 0 && (
                <>
                  <div className={styles.panel}>
                    <div className={styles.panelInner}>
                      <div className={styles.panelHeader}>
                        <CheckoutIcon />
                        {lang === "en" ? "Order Summary" : "آرڈر کا خلاصہ"}
                      </div>
                      <div className={styles.summaryBox}>
                        <div className={styles.summaryRow}>
                          <span>{lang === "en" ? "Subtotal:" : "ذیلی کل:"}</span>
                          <span>Rs. {subtotal.toLocaleString()}</span>
                        </div>
                        <div className={styles.summaryRow}>
                          <span>{lang === "en" ? "Sales Tax (17%):" : "سیلز ٹیکس (17%):"}</span>
                          <span>Rs. {tax.toLocaleString()}</span>
                        </div>
                        <div className={styles.summaryRow}>
                          <span>{lang === "en" ? "Shipping:" : "ترسیل:"}</span>
                          <span style={{ color: "green" }}>
                            {lang === "en" ? "FREE" : "مفت"}
                          </span>
                        </div>
                        <div className={styles.summaryTotal}>
                          <span>{lang === "en" ? "Total:" : "کل:"}</span>
                          <span>Rs. {total.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className={styles.buttonRow}>
                    <button
                      className={styles.pushBtnDanger}
                      onClick={clearCart}
                    >
                      {lang === "en" ? "Clear Cart" : "ٹوکری صاف کریں"}
                    </button>
                    <Link href="/">
                      <button className={styles.pushBtn}>
                        {lang === "en" ? "Continue Shopping" : "خریداری جاری رکھیں"}
                      </button>
                    </Link>
                    <button className={styles.pushBtnPrimary}>
                      {lang === "en" ? "Proceed to Checkout" : "ادائیگی کریں"}
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Status bar */}
        <div className={styles.statusBar}>
          <div className={styles.statusPanel}>
            {items.length > 0
              ? `${itemCount} object(s) — Rs. ${total.toLocaleString()} total`
              : "Cart is empty"}
          </div>
          <div className={styles.statusPanel} style={{ flex: "0 0 140px" }}>
            MyStore Local
          </div>
          <div className={styles.statusPanel} style={{ flex: "0 0 100px" }}>
            {lang === "en" ? "English" : "اردو"}
          </div>
        </div>

      </div>
    </div>
  );
}
