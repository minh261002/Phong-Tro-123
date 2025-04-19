import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface CartStore {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
}

export interface CartItem {
  id: string;
  image: string;
  name: string;
  slug: string;
  unitPrice: number; 
  quantity: number;
  totalQuantity?: number; 
  price?: number;
}

const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      cart: [],
      
      addToCart: (item) => {
        const existingItem = get().cart.find((i) => i.id === item.id);
        if (existingItem) {
          set((state) => ({
            cart: state.cart.map((i) =>
              i.id === item.id
                ? {
                    ...i,
                    quantity: i.quantity + item.quantity,
                    price: i.unitPrice * (i.quantity + item.quantity),
                  }
                : i
            ),
          }));
        } else {
          set((state) => ({
            cart: [
              ...state.cart,
              {
                ...item,
                price: item.unitPrice * item.quantity,
              },
            ],
          }));
        }
      },
      
      removeFromCart: (itemId: string) => {
        set((state) => ({
          cart: state.cart.filter((i) => i.id !== itemId),
        }));
      },
      
      updateQuantity: (itemId: string, quantity: number) => {
        set((state) => ({
          cart: state.cart.map((i) =>
            i.id === itemId
              ? { ...i, quantity, price: i.unitPrice * quantity }
              : i
          ),
        }));
      },

      clearCart: () => {
        set({ cart: [] });
      },
      
    }),
    {
      name: 'cart-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useCartStore;
