import Link from 'next/link';
import Image from 'next/image';
import { type Product } from '@/data/products';

export function ProductCard({ product }: { product: Product }) {
  return (
    <div className="card product-card">
      <Link href={`/product/${product.slug}`} className="product-image">
        <Image src={product.image} alt={product.name} fill sizes="(max-width: 768px) 100vw, 33vw" style={{ objectFit: 'cover' }} />
      </Link>
      <div className="product-meta">
        <div>
          <Link href={`/product/${product.slug}`}><strong>{product.name}</strong></Link>
          <div style={{ color: 'var(--muted)', fontSize: 13 }}>{product.category}</div>
        </div>
        <div className="price">${product.price.toFixed(2)}</div>
      </div>
    </div>
  );
}
