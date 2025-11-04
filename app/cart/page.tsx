"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import { formatCurrency } from '@/lib/format';

export default function CartPage() {
  const { itemsDetailed, totalPrice, setQty, remove } = useCart();
  const empty = itemsDetailed.length === 0;

  return (
    <section className="grid" style={{ gridTemplateColumns: '1.2fr 1fr' }}>
      <div className="card" style={{ padding: 16 }}>
        <h2 style={{ marginTop: 0 }}>Cart</h2>
        {empty ? (
          <div style={{ color: 'var(--muted)' }}>Your cart is empty. <Link className="nav-link" href="/catalog">Browse products</Link>.</div>
        ) : (
          <div style={{ display: 'grid', gap: 12 }}>
            {itemsDetailed.map(({ product, quantity }) => (
              <div key={product.id} className="card" style={{ display: 'grid', gridTemplateColumns: '120px 1fr auto', gap: 12, padding: 10 }}>
                <div style={{ position: 'relative', width: 120, height: 90 }}>
                  <Image src={product.image} alt={product.name} fill style={{ objectFit: 'cover', borderRadius: 8 }} />
                </div>
                <div>
                  <div style={{ fontWeight: 700 }}>{product.name}</div>
                  <div style={{ color: 'var(--muted)', fontSize: 13 }}>{product.category}</div>
                  <div style={{ marginTop: 8, display: 'flex', alignItems: 'center', gap: 10 }}>
                    <label style={{ color: 'var(--muted)', fontSize: 12 }}>Qty</label>
                    <input type="number" min={1} value={quantity} onChange={(e) => setQty(product.id, Number(e.target.value) || 1)} style={{ width: 70, padding: '6px 8px', borderRadius: 8, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.14)', color: 'var(--text)' }} />
                    <button className="button ghost" onClick={() => remove(product.id)}>Remove</button>
                  </div>
                </div>
                <div style={{ display: 'grid', placeItems: 'end', fontWeight: 800 }}>{formatCurrency(product.price * quantity)}</div>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="card" style={{ padding: 16, height: 'fit-content', position: 'sticky', top: 92 }}>
        <h3 style={{ marginTop: 0 }}>Summary</h3>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: 'var(--muted)' }}>
          <span>Subtotal</span>
          <span>{formatCurrency(totalPrice)}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: 'var(--muted)' }}>
          <span>Shipping</span>
          <span>Calculated at checkout</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 12 }}>
          <strong>Total</strong>
          <strong>{formatCurrency(totalPrice)}</strong>
        </div>
        <Link href={empty ? '/catalog' : '/checkout'} className="button" style={{ marginTop: 12, display: 'block', textAlign: 'center' }}>
          {empty ? 'Continue Shopping' : 'Proceed to Checkout'}
        </Link>
      </div>
    </section>
  );
}
