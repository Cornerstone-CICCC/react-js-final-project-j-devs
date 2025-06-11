import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product } from '@/types';

type CartItem = {
  product: Product;
  size: string;
  quantity: number;
};

type CartStore = {
  cart: CartItem[];
  addToCart: (product: Product, size: string) => void;
  removeFromCart: (productId: string, size: string) => void;
  clearCart: () => void;
};

export const useCartStore = create<CartStore>()(
  persist(
    (set) => ({
      cart: [],
      addToCart: (product, size) =>
        set((state) => {
          const existing = state.cart.find(
            (item) => item.product.id === product.id && item.size === size
          );

          if (existing) {
            return {
              cart: state.cart.map((item) =>
                item.product.id === product.id && item.size === size
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
              ),
            };
          } else {
            return {
              cart: [...state.cart, { product, size, quantity: 1 }],
            };
          }
        }),
      removeFromCart: (productId, size) =>
        set((state) => ({
          cart: state.cart.filter(
            (item) => item.product.id !== productId || item.size !== size
          ),
        })),
      clearCart: () => set({ cart: [] }),
    }),
    {
      name: 'cart-storage', // localStorage key
    }
  )
);
