'use client';

import { useRouter, useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { products } from '@/lib/data';
import { Product } from '@/types';
import Link from 'next/link';
import Image from 'next/image';
import toast, { Toaster } from 'react-hot-toast';
import { useCartStore } from '@/store/useCartStore';

export default function ProductModal() {
  const router = useRouter();
  const params = useParams();

  const productId = Array.isArray(params.id) ? params.id[0] : params.id;
  const product: Product | undefined = products.find((p) => p.id === productId);

  const [selectedSize, setSelectedSize] = useState('M');

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        router.back();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [router]);

  if (!product) return null;

  const descriptionMap: Record<string, { description: string; material: string }> = {
    'Cropped Jacket': {
      description: 'Stay stylish and warm with this cropped jacket, perfect for cool evenings and casual outings.',
      material: '65% polyester, 35% cotton',
    },
    'Oversized Hoodie': {
      description: 'Cozy and roomy, this oversized hoodie is ideal for lounging or layering in streetwear fashion.',
      material: '100% organic cotton',
    },
    'Denim Skirt': {
      description: 'Classic high-waisted denim skirt with a modern cut, great for a vintage-inspired outfit.',
      material: '98% cotton, 2% elastane',
    },
    'Black Cargo Pants': {
      description: 'Functional cargo pants with a modern fit and multiple pockets for utility and style.',
      material: '100% nylon',
    },
    'Urban T-Shirt': {
      description: 'Minimalist t-shirt featuring a soft fit and trendy graphic for an urban look.',
      material: '100% cotton',
    },
    'Bomber Jacket': {
      description: 'Bold varsity-inspired bomber jacket that adds attitude to any outfit.',
      material: '50% wool, 50% polyester',
    },
    'Slim Fit Jeans': {
      description: 'Stretchy slim fit jeans designed for comfort and everyday wear.',
      material: '99% cotton, 1% elastane',
    },
    'Logo Hoodie': {
      description: 'Branded hoodie with signature logo print, made to elevate your casual wardrobe.',
      material: '80% cotton, 20% recycled polyester',
    },
    'Short-Sleeve Shirt': {
      description: 'Breathable short-sleeve shirt perfect for warm days and smart-casual occasions.',
      material: '70% rayon, 30% linen',
    },
  };

  const { description, material } = descriptionMap[product.name] || {
    description: 'No description available.',
    material: 'Material not specified.',
  };

  const addToCart = useCartStore((state) => state.addToCart);

const handleAddToCart = () => {
  addToCart(product, selectedSize);
  toast.success(`Added ${product.name} (${selectedSize}) to cart`);
};

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <Toaster position="bottom-center" />
      <div className="bg-white p-6 rounded-xl max-w-md w-full text-black">
<div className="mx-auto mb-4 w-64 h-64 overflow-hidden rounded-xl">
  <img
    src={product.image}
    alt={product.name}
    className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
  />
</div>
        <h2 className="text-2xl font-bold mb-2">{product.name}</h2>
        <p className="text-xl text-gray-700 mb-2">${product.price.toFixed(2)}</p>
        <p className="text-base font-medium text-gray-800 mb-1">{description}</p>
        <p className="text-base font-medium text-gray-600 mb-4">Material: {material}</p>

        <div className="flex gap-2 mb-4">
          {["XS", "S", "M", "L", "XL"].map((size) => (
            <button
              key={size}
              className={`px-3 py-1 border rounded-full transition-all duration-200 ${
                selectedSize === size ? 'bg-black text-white' : 'bg-white text-black border-gray-300'
              }`}
              onClick={() => setSelectedSize(size)}
            >
              {size}
            </button>
          ))}
        </div>
<div className="flex flex-col gap-2 mt-4">
  <button
    onClick={handleAddToCart}
    className="bg-black text-white w-full py-2 rounded hover:bg-gray-800 transition"
  >
    Add to Cart
  </button>

  <Link
  href="/cart"
  className="w-full py-2 rounded text-center font-semibold bg-gray-200 text-black hover:bg-gray-300 transition block"
>
  Go to Cart
</Link>

  <button
    onClick={() => router.back()}
    className="bg-gray-200 text-black w-full py-2 rounded hover:bg-gray-300 transition"
  >
    Close
  </button>
</div>
      </div>
    </div>
  );
}
