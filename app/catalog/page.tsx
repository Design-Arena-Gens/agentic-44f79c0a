"use client";

import { useMemo, useState } from 'react';
import { products } from '@/data/products';
import { ProductGrid } from '@/components/ProductGrid';

const categories = ['All', ...Array.from(new Set(products.map((p) => p.category)))];

export default function CatalogPage() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return products.filter((p) => {
      const matchesQuery = !q || p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q);
      const matchesCat = category === 'All' || p.category === (category as any);
      return matchesQuery && matchesCat;
    });
  }, [query, category]);

  return (
    <section style={{ position: 'relative', zIndex: 1 }}>
      <div className="card" style={{ padding: 16, marginBottom: 16, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
        <input
          placeholder="Search gear..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{
            flex: 1,
            minWidth: 220,
            padding: '12px 14px',
            borderRadius: 10,
            border: '1px solid rgba(255,255,255,0.14)',
            background: 'rgba(255,255,255,0.04)',
            color: 'var(--text)'
          }}
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          style={{
            minWidth: 160,
            padding: '12px 14px',
            borderRadius: 10,
            border: '1px solid rgba(255,255,255,0.14)',
            background: 'rgba(255,255,255,0.04)',
            color: 'var(--text)'
          }}
        >
          {categories.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>

      <ProductGrid products={filtered} />
    </section>
  );
}
