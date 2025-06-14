'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import CatalogHeader from '@/components/CatalogHeader';
import ProductList from '@/components/ProductList';
import { Category, Product } from '@/types';
import { getAllProducts } from '@/app/actions/product.actions';

export default function ProductsPage() {
  const searchParams = useSearchParams();

  const urlFilter = (searchParams.get('filter') as Category) || 'all';
  const [filter, setFilter] = useState<Category | 'all'>(urlFilter);
  const [search, setSearch] = useState('');
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const data = await getAllProducts();
      setProducts(data);
      setLoading(false);
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    setFilter((searchParams.get('filter') as Category) || 'all');
  }, [searchParams]);

  const byCategory =
    filter === 'all' ? products : products.filter((p) => p.category === filter);

  const visible = byCategory.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <CatalogHeader onSearch={setSearch} onFilter={setFilter} />

      
              <ProductList  />
          
    </div>
  );
}
