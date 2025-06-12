'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import CatalogHeader from '@/components/CatalogHeader'
import ProductList from '@/components/ProductList'
import { products } from '@/lib/data'
import { Category, Product } from '@/types'

export default function ProductsPage() {
  const searchParams = useSearchParams()

  const urlFilter = (searchParams.get('filter') as Category) || 'all'
  const [filter, setFilter] = useState<Category | 'all'>(urlFilter)
  const [search, setSearch] = useState('')

 
  useEffect(() => {
    setFilter((searchParams.get('filter') as Category) || 'all')
  }, [searchParams])

 
  const byCategory =
    filter === 'all' ? products : products.filter((p) => p.category === filter)

  const visible = byCategory.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div>
      <CatalogHeader onSearch={setSearch} onFilter={setFilter} />

      <main className="px-8 py-16 bg-[#f8f9fb] min-h-screen">
        <h2 className="text-5xl font-extrabold text-gray-900 text-center mb-12">
          Shop Our Collection
        </h2>
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          <ProductList products={visible as Product[]} />
        </div>
      </main>
    </div>
  )
}
