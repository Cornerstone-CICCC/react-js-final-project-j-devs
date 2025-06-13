'use client';

import { useCartStore } from '@/store/useCartStore';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import toast, { Toaster } from 'react-hot-toast';

export default function CartPage() {
  const { cart, removeFromCart, clearCart, addToCart } = useCartStore();
  const router = useRouter();
  const searchParams = useSearchParams();
  const status = searchParams.get('status');

  const total = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const handleCheckout = async () => {
    if (cart.length === 0) return;

    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cart }),
      });
      const { url } = await res.json();
      window.location.assign(url);
    } catch (err) {
      console.error(err);
      toast.error('Failed to initiate Stripe Checkout.');
    }
  };

return (
  <div className="bg-white min-h-screen text-black px-4 sm:px-0">
    <section className="max-w-4xl mx-auto p-6">
      <Toaster position="bottom-center" />

    
      <h1 className="text-4xl sm:text-5xl font-bold mb-8 text-center">
        Shopping Cart
      </h1>

      {cart.length === 0 ? (
        <p className="text-center text-gray-600 text-xl sm:text-2xl mb-8">
          Your cart is empty.
        </p>
      ) : (
        <>
          <ul className="space-y-6">
            {cart.map((item, index) => (
             <li
  key={`${item.product.id}-${item.size}-${index}`}
  className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b pb-4"
>
 
  <div className="flex-shrink-0 overflow-hidden rounded-lg mb-4 sm:mb-0 sm:mr-4">
    <Image
      src={item.product.image}
      alt={item.product.name}
      width={400}
      height={400}
      className="w-full h-64 sm:w-40 sm:h-40 object-cover transition-transform duration-300 hover:scale-110"
      priority
    />
  </div>

                
                <div className="flex-1 mb-4 sm:mb-0 sm:mx-4">
                  <h2 className="font-semibold text-lg sm:text-xl">
                    {item.product.name}
                  </h2>
                  <p className="text-sm text-gray-600">Size: {item.size}</p>
                  <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                  <p className="text-sm text-gray-600">
                    Price: ${(item.product.price * item.quantity).toFixed(2)}
                  </p>
                </div>

               
                <div className="flex flex-col sm:flex-row items-center gap-4">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        useCartStore.setState((state) => {
                          const c = [...state.cart];
                          const i = c.findIndex(
                            (x) =>
                              x.product.id === item.product.id &&
                              x.size === item.size
                          );
                          if (i === -1) return {};
                          if (c[i].quantity === 1) c.splice(i, 1);
                          else c[i].quantity--;
                          return { cart: c };
                        });
                        toast.success(
                          `${item.product.name} quantity decreased`,
                          { icon: '❌' }
                        );
                      }}
                      className="px-2 py-1 border rounded-md text-lg hover:bg-gray-100"
                    >
                      –
                    </button>
                    <span className="min-w-[2rem] text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => {
                        addToCart(item.product, item.size);
                        toast.success(
                          `${item.product.name} quantity increased`,
                    
                        );
                      }}
                      className="px-2 py-1 border rounded-md text-lg hover:bg-gray-100"
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={() => {
                      removeFromCart(item.product.id, item.size);
                      toast.success(`${item.product.name} removed`, {
                        icon: '❌',
                      });
                    }}
                    className="px-3 py-1 border border-red-500 text-red-500 rounded-md hover:bg-red-500 hover:text-white transition"
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>

          {/* Clear & Checkout */}
          <div className="mt-8 flex flex-col sm:flex-row justify-end items-center gap-4">
            <button
              onClick={() => {
                clearCart();
                toast.success('Cart cleared', { icon: '❌' });
              }}
              className="w-full sm:w-auto px-4 py-2 bg-gray-100 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-200 transition"
            >
              Clear Cart
            </button>
            <button
              onClick={handleCheckout}
              className="w-full sm:w-auto px-6 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition"
            >
              Checkout
            </button>
          </div>
        </>
      )}

     
      <div className="mt-12 text-center">
        <Link
          href="/products"
          className="inline-block px-6 py-3 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-600 hover:text-white transition"
        >
          Continue Shopping
        </Link>
      </div>
    </section>
  </div>
);


}
