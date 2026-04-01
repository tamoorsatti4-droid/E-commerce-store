import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { CartProvider } from "@/components/CartContext";

export const metadata: Metadata = {
  title: "E-Commerce Store",
  description: "Complete full-stack e-commerce project",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <Navbar />
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
