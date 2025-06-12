// src/components/ClearOrdersButton.tsx
'use client'

import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

export default function ClearOrdersButton() {
  const router = useRouter()

  const handleClear = async () => {
    try {
      const res = await fetch('/api/clear-orders', { method: 'POST' })
      if (!res.ok) throw new Error('Failed')
      toast.success('Orders cleared')
      router.refresh()
    } catch {
      toast.error('Could not clear orders')
    }
  }

  return (
    <button
      onClick={handleClear}
      className="
        px-4 py-2 
        bg-red-500 text-white 
        rounded-md 
        hover:bg-red-700 
        hover:shadow-lg 
        focus:outline-none focus:ring-2 focus:ring-red-400 
        transition-all duration-200 transform 
        hover:scale-105
      "
    >
      Clear Orders
    </button>
  )
}
