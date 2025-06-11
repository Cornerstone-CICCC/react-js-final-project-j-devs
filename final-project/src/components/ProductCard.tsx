'use client';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Product } from '../types';

export default function ProductCard({ product }: { product: Product }) {
  const router = useRouter();

  const handleViewMore = () => {
    router.push(`/products/${product.id}`);
  };

 return (
  <div className="border rounded-xl overflow-hidden shadow hover:scale-105 transition-transform bg-white text-black">
    <div className="w-full h-72 bg-white flex items-center justify-center overflow-hidden rounded-t-xl">
     <img
  src={product.image}
  alt={product.name}
  className="h-full object-contain rounded-xl transition-transform duration-300 hover:scale-110"
/>
    </div>
    <div className="p-4 flex flex-col gap-2">
      <h3 className="font-semibold text-lg">{product.name}</h3>
      <p className="text-gray-600">${product.price.toFixed(2)}</p>
      <button
        onClick={() => router.push(`/products/${product.id}`)}
        className="mt-2 bg-black text-white py-2 rounded hover:bg-gray-800 transition"
      >
        View More
      </button>
    </div>
  </div>
);
;

}
