'use client';

import { useEffect, useState } from 'react';
import { getAllProducts } from '@/app/actions/product.actions';
import ProductCard from './ProductCard';
import { Product } from '@/types';

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await getAllProducts();
      setProducts(data);
      setLoading(false);
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <p className="text-center py-8">Loading products...</p>;
  }

  return (
    <section className="px-8 py-16 bg-[#f8f9fb] min-h-screen">
      <h2 className="text-3xl font-bold text-center mb-12">Shop Our Collection</h2>
      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </section>
  );
}
