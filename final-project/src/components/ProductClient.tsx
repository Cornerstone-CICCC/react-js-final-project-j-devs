'use client';

import { Product } from '@/types';
import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import Image from 'next/image';
import Link from 'next/link';
import { useCartStore } from '@/store/useCartStore';

type Props = {
  product: Product;
};

export default function ProductClient({ product }: Props) {
  const [selectedSize, setSelectedSize] = useState('M');
  const addToCart = useCartStore((state) => state.addToCart);

  const handleAddToCart = () => {
    addToCart(product, selectedSize);
    toast.success(`Added ${product.name} (${selectedSize}) to cart`);
  };

  return (
    <section className="px-8 py-16 max-w-3xl mx-auto text-white bg-black min-h-screen">
      <Toaster position="bottom-center" />
      <div className="flex flex-col gap-8 items-center text-center">
        <div className="mx-auto mb-4 w-full max-w-xs sm:max-w-sm md:max-w-md overflow-hidden rounded-xl">
          <Image
            src={product.image}
            alt={product.name}
            width={400}
            height={400}
            className="w-full h-auto object-cover transition-transform duration-300 hover:scale-110"
          />
        </div>

        <h1 className="text-3xl font-bold text-white">{product.name}</h1>
        <p className="text-2xl text-gray-300 font-semibold">${product.price.toFixed(2)}</p>
        <p className="text-lg text-gray-400 font-medium max-w-prose">{product.description}</p>
        <p className="text-md text-gray-500 font-medium">
          Material: {product.material ?? 'Material not specified'}
        </p>

        <div className="flex gap-4 mt-4">
          {['XS', 'S', 'M', 'L', 'XL'].map((size) => (
            <button
              key={size}
              onClick={() => setSelectedSize(size)}
              className={`px-4 py-2 border rounded transition font-medium ${
                selectedSize === size
                  ? 'bg-white text-black border-white'
                  : 'border-gray-500 text-white hover:bg-gray-800'
              }`}
            >
              {size}
            </button>
          ))}
        </div>

        <button
          onClick={handleAddToCart}
          className="mt-6 bg-white text-black font-semibold px-6 py-3 rounded hover:bg-gray-200 transition"
        >
          Add to Cart
        </button>

        <Link
          href="/cart"
          className="w-full py-2 rounded text-center font-semibold bg-white text-black hover:bg-gray-200 transition block"
        >
          Go to Cart
        </Link>
      </div>
    </section>
  );
}
