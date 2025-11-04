"use client";

import Link from 'next/link';
import { useCart } from '@/context/CartContext';

export function NavBar() {
  const { totalQuantity } = useCart();
  return (
    <nav className="navbar">
      <div className="nav-inner">
        <Link href="/" className="logo">
          <span className="logo-badge" />
          <span>NEONFORGE</span>
        </Link>
        <div className="nav-links">
          <Link href="/catalog" className="nav-link">Catalog</Link>
          <Link href="/cart" className="nav-link">Cart ({totalQuantity})</Link>
        </div>
      </div>
    </nav>
  );
}
