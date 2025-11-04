import Image from 'next/image';
import Link from 'next/link';
import { ProductGrid } from '@/components/ProductGrid';
import { products } from '@/data/products';

export default function HomePage() {
  const featured = products.slice(0, 6);
  return (
    <div style={{ position: 'relative', zIndex: 1 }}>
      <section className="hero">
        <div className="card panel">
          <h1 className="hero-title">NeonForge</h1>
          <p className="hero-sub">High-performance gaming gear forged in neon. Keyboards, mice, headsets and chairs engineered for victory.</p>
          <div style={{ display: 'flex', gap: 12 }}>
            <Link className="button" href="/catalog">Shop Catalog</Link>
            <Link className="button ghost" href="#featured">View Featured</Link>
          </div>
          <div className="badges">
            <span className="badge">48h Express Shipping</span>
            <span className="badge">2-Year Warranty</span>
            <span className="badge">Secure Checkout</span>
          </div>
        </div>
        <div className="card panel" style={{ display: 'grid', placeItems: 'center' }}>
          <div style={{ position: 'relative', width: '100%', maxWidth: 480 }}>
            <Image src="https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1887&auto=format&fit=crop" alt="Gaming setup" width={960} height={720} style={{ width: '100%', height: 'auto', borderRadius: 12 }} />
          </div>
        </div>
      </section>

      <section id="featured" style={{ marginTop: 36 }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 12 }}>
          <div>
            <h2 style={{ margin: 0 }}>Featured Gear</h2>
            <p className="hero-sub" style={{ margin: 0 }}>Curated best-sellers, tuned for esports.</p>
          </div>
          <Link className="nav-link" href="/catalog">Browse all ?</Link>
        </div>
        <ProductGrid products={featured} />
      </section>
    </div>
  );
}
