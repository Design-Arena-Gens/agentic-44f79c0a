"use client";

import { useMemo } from 'react';
import { notFound, useParams } from 'next/navigation';
import Image from 'next/image';
import { products } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { formatCurrency } from '@/lib/format';

export default function ProductDetailPage() {
  const params = useParams<{ slug: string }>();
  const product = useMemo(() => products.find((p) => p.slug === params.slug), [params.slug]);
  const { add } = useCart();

  if (!product) return notFound();

  return (
    <div className="grid" style={{ gridTemplateColumns: '1.1fr 1fr', gap: 24 }}>
      <div className="card" style={{ padding: 14 }}>
        <div className="product-image" style={{ height: 0, paddingBottom: '75%', position: 'relative' }}>
          <Image src={product.image} alt={product.name} fill sizes="(max-width: 900px) 100vw, 50vw" style={{ objectFit: 'cover' }} />
        </div>
      </div>
      <div className="card" style={{ padding: 20 }}>
        <h1 style={{ marginTop: 0 }}>{product.name}</h1>
        <div style={{ color: 'var(--muted)' }}>{product.category}</div>
        <div style={{ marginTop: 12, fontSize: 18 }}>{product.description}</div>
        <div style={{ marginTop: 14, display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          {product.specs?.map((s) => (
            <span key={s} className="badge">{s}</span>
          ))}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 18 }}>
          <div className="price" style={{ fontSize: 24 }}>{formatCurrency(product.price)}</div>
          <button className="button" onClick={() => add(product.id, 1)}>Add to Cart</button>
        </div>
      </div>
    </div>
  );
}
