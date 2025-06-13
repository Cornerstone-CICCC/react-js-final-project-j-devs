'use client';

import { useRouter, useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import toast, { Toaster } from 'react-hot-toast';
import { useCartStore } from '@/store/useCartStore';
import Image from 'next/image';
import { Product } from '@/types';

export default function ProductModal() {
  const router = useRouter();
  const params = useParams();

  const productId = Array.isArray(params.id) ? params.id[0] : params.id;
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState('M');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/products/${productId}`);
        if (!res.ok) throw new Error('Failed to fetch product');
        const data = await res.json();
        setProduct(data);
      } catch (error) {
        console.error(error);
        toast.error('Failed to load product');
        router.back();
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') router.back();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [router]);

  const addToCart = useCartStore((state) => state.addToCart);

  const handleAddToCart = () => {
    if (!product) return;
    addToCart(product, selectedSize);
    toast.success(`Added ${product.name} (${selectedSize}) to cart`);
  };

  if (loading) return <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 text-white">Loading...</div>;
  if (!product) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <Toaster position="bottom-center" />
      <div className="bg-white p-6 rounded-xl max-w-md w-full text-black">
        <div className="mx-auto mb-4 w-64 h-64 overflow-hidden rounded-xl">
          <Image
            src={product.image}
            alt={product.name}
            width={256}
            height={256}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
          />
        </div>
        <h2 className="text-2xl font-bold mb-2">{product.name}</h2>
        <p className="text-xl text-gray-700 mb-2">${product.price.toFixed(2)}</p>
        <p className="text-base font-medium text-gray-800 mb-1">{product.description}</p>
        <p className="text-base font-medium text-gray-600 mb-4">Material: {product.material ?? 'Material not specified'}</p>

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
