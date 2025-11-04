import { products as all } from '@/data/products';
import { ProductCard } from './ProductCard';
import { type Product } from '@/data/products';

export function ProductGrid({ products = all }: { products?: Product[] }) {
  return (
    <div className="grid cols-3">
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
}
