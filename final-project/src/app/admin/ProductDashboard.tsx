"use client"

import React, { useState } from "react"
import { ProductType, deleteProduct } from "@/app/actions/product.actions"
import Image from "next/image"

interface Props {
  products: ProductType[]
  refreshProducts: () => void
}

export default function ProductDashboard({ products, refreshProducts }: Props) {
  const [productList, setProductList] = useState(products)

  const handleDelete = async (id: string) => {
    try {
      await deleteProduct(id)
      await refreshProducts() // 🔁 Re-fetch after delete
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <section className="p-4 sm:ml-64">
      <h2 className="text-2xl font-bold mb-4">📊 YVR Dashboard</h2>
      {productList.length === 0 ? (
        <p className="text-gray-500">No products available.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 items-stretch">
          {productList.map((product) => (
            <div
              key={product._id}
              className="flex flex-col justify-between w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm"
            >
              <div className="p-8">
                <Image
                  className="rounded-t-lg h-64 w-full object-cover"
                  src={product.image}
                  alt={product.name}
                  width={500}
                  height={500}
                />
              </div>
              <div className="px-5 pb-5">
                <h5 className="text-xl font-semibold tracking-tight text-gray-900">
                  {product.name}
                </h5>
                <div className="text-gray-600 space-y-1 mt-2">
                  <p>{product.description}</p>
                  <p>Category: {product.category}</p>
                  <p>Price: ${product.price}</p>
                  <p>Stock: {product.stock}</p>
                  <p>Sizes: {product.size.join(", ")}</p>
                </div>

                <div className="mt-4 flex gap-2">
                  <button
                    className="flex-1 text-white bg-yellow-500 hover:bg-yellow-600 font-medium rounded-lg text-sm px-4 py-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(product._id)}
                    className="flex-1 text-white bg-red-600 hover:bg-red-700 font-medium rounded-lg text-sm px-4 py-2"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}
