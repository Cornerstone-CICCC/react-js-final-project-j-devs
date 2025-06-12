'use client';

import ProductCard from './ProductCard';
import { Product } from '@/types';

type Props = {
  products: Product[];
};

export default function ProductList({ products }: Props) {
  return (
    <>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </>
  );
}
