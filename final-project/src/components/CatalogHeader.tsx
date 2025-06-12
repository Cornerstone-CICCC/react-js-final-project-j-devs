// src/components/CatalogHeader.tsx
'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Category } from '@/types'

type CatalogHeaderProps = {
  onSearch: (query: string) => void
  onFilter: (category: Category | 'all') => void
}

export default function CatalogHeader({ onSearch, onFilter }: CatalogHeaderProps) {
  const [search, setSearch] = useState('')
  const [active, setActive] = useState<Category | 'all'>('all')

  const handleFilter = (cat: Category | 'all') => {
    setActive(cat)
    onFilter(cat)
  }

  return (
    <header className="bg-white shadow-md">
      <div className="max-w-6xl mx-auto px-4 py-3 flex flex-wrap sm:flex-nowrap items-center justify-between gap-4">
        
        <Link href="/" className="text-2xl font-extrabold text-black">
          YVR
        </Link>

     
        <input
          type="text"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value)
            onSearch(e.target.value)
          }}
          placeholder="Search products…"
          className="flex-1 max-w-sm px-4 py-2 border rounded-md text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        
        <nav className="flex gap-2">
          {(['all', 'women', 'men'] as (Category | 'all')[]).map((cat) => (
            <button
              key={cat}
              onClick={() => handleFilter(cat)}
              className={`px-3 py-1 rounded-md font-medium transition ${
                active === cat
                  ? 'bg-blue-600 text-white'
                  : 'border border-gray-300 text-gray-700 hover:bg-gray-100'
              }`}
            >
              {cat === 'all'
                ? 'All'
                : cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </nav>

       
        <div className="flex items-center gap-4">
          <Link href="/cart" className="text-3xl hover:text-blue-600 transition" aria-label="Cart">
            🛒
          </Link>
          <Link
            href="/my-orders"
            className="px-3 py-1 border border-gray-300 rounded-md text-black hover:bg-gray-100 transition"
          >
            My Orders
          </Link>
       
          <Link
            href="/user"
            className="px-3 py-1 border border-gray-300 rounded-md text-black hover:bg-gray-100 transition"
          >
            Profile
          </Link>
          <button
            onClick={() => alert('Sign out logic')}
            className="px-3 py-1 border border-red-500 text-red-500 rounded-md hover:bg-red-500 hover:text-white transition"
          >
            Sign Out
          </button>
        </div>
      </div>
    </header>
  )
}
