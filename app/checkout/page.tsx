"use client";

import { useCart } from '@/context/CartContext';
import { formatCurrency } from '@/lib/format';

export default function CheckoutPage() {
  const { totalPrice, reset } = useCart();

  return (
    <section className="grid" style={{ gridTemplateColumns: '1fr 1fr', gap: 20 }}>
      <div className="card" style={{ padding: 16 }}>
        <h2 style={{ marginTop: 0 }}>Checkout</h2>
        <form
          className="grid"
          style={{ gap: 12 }}
          onSubmit={(e) => {
            e.preventDefault();
            alert('Order placed! Thank you for shopping at NeonForge.');
            reset();
          }}
        >
          <input placeholder="Full name" required style={inputStyle} />
          <input placeholder="Email" type="email" required style={inputStyle} />
          <input placeholder="Address" required style={inputStyle} />
          <div className="grid" style={{ gridTemplateColumns: '2fr 1fr', gap: 12 }}>
            <input placeholder="City" required style={inputStyle} />
            <input placeholder="ZIP" required style={inputStyle} />
          </div>
          <input placeholder="Card number" required style={inputStyle} />
          <div className="grid" style={{ gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <input placeholder="MM/YY" required style={inputStyle} />
            <input placeholder="CVC" required style={inputStyle} />
          </div>
          <button className="button" type="submit">Pay {formatCurrency(totalPrice)}</button>
        </form>
      </div>
      <div className="card" style={{ padding: 16 }}>
        <h3 style={{ marginTop: 0 }}>Secure Payment</h3>
        <p style={{ color: 'var(--muted)' }}>256-bit SSL encryption. We never store your payment details.</p>
        <div className="badges">
          <span className="badge">Visa</span>
          <span className="badge">Mastercard</span>
          <span className="badge">Amex</span>
          <span className="badge">PayPal</span>
        </div>
      </div>
    </section>
  );
}

const inputStyle: React.CSSProperties = {
  padding: '12px 14px',
  borderRadius: 10,
  border: '1px solid rgba(255,255,255,0.14)',
  background: 'rgba(255,255,255,0.04)',
  color: 'var(--text)'
};
