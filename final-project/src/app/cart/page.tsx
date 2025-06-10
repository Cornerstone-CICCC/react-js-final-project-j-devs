'use client';

import { useCartStore } from '@/store/useCartStore';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import toast, { Toaster } from 'react-hot-toast';

export default function CartPage() {
  const { cart, removeFromCart, clearCart } = useCartStore();
  const router = useRouter();
  const searchParams = useSearchParams();

  const status = searchParams.get('status');

  // 🔹 Calcular el total
  const total = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  // 🔹 Función simulada de checkout
  const handleCheckout = () => {
    router.push('/cart?status=success');
  };

  useEffect(() => {
    if (status === 'success') {
      toast.success('Purchase completed successfully!');
      router.replace('/cart'); // limpia la URL
    }
    if (status === 'cancel') {
      toast.error('Purchase was cancelled.');
      router.replace('/cart'); // limpia la URL
    }
  }, [status, router]);

  return (
    <section className="max-w-4xl mx-auto p-6 min-h-screen bg-white text-black">
      <Toaster position="bottom-center" />
      <h1 className="text-3xl font-bold mb-6 text-center">Shopping Cart</h1>

      {cart.length === 0 ? (
        <p className="text-center text-gray-600">Your cart is empty.</p>
      ) : (
        <>
  <ul className="space-y-6">
  {cart.map((item, index) => (
    <li
      key={`${item.product.id}-${item.size}-${index}`}
      className="flex items-center justify-between border-b pb-4"
    >
      {/* Contenedor flex principal */}
      <div className="flex items-center gap-4">
        {/* Wrapper de la imagen */}
    <div className="relative flex-shrink-0 w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 overflow-hidden rounded-lg">
  <Image
    src={item.product.image}
    alt={item.product.name}
    fill
    className="object-cover transition-transform duration-300 hover:scale-110"
  />
</div>
        {/* Detalles del producto */}
        <div>
          <h2 className="font-semibold text-lg">{item.product.name}</h2>
          <p className="text-sm text-gray-600">Size: {item.size}</p>
          <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
          <p className="text-sm text-gray-600">
            Price: ${(item.product.price * item.quantity).toFixed(2)}
          </p>
        </div>
      </div>

      {/* Botón de Remove (o cualquier otro botón) */}
      <button
        onClick={() => removeFromCart(item.product.id, item.size)}
        className="text-red-500 hover:text-red-700 font-semibold"
      >
        Remove
      </button>
    </li>
  ))}
</ul>

          <div className="mt-8 border-t pt-4 flex flex-col items-end gap-4">
            <p className="text-xl font-bold">Total: ${total.toFixed(2)}</p>

            <div className="flex gap-4">
              <button
                onClick={clearCart}
                className="px-4 py-2 border border-gray-400 rounded hover:bg-gray-100"
              >
                Clear Cart
              </button>
              <button
                onClick={handleCheckout}
                className="px-6 py-2 bg-black text-white rounded hover:bg-gray-800"
              >
                Checkout
              </button>
            </div>

            <Link href="/" className="text-sm text-blue-500 underline">
              Continue Shopping
            </Link>
          </div>
        </>
      )}
    </section>
  );
}

