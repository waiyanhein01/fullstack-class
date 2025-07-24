import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { persist, createJSONStorage } from "zustand/middleware";

interface CartItem {
  id: number;
  image: string;
  price: number;
  quantity: number;
  name: string;
}

interface CartState {
  carts: CartItem[];
}

interface CartActions {
  getTotalItems: () => number;
  getTotalPrice: () => number;
  addItem: (item: CartItem) => void;
  updateItem: (id: number, quantity: number) => void;
  removeItem: (id: number) => void;
  clearCarts: () => void;
}

const initialState: CartState = {
  carts: [],
};

export const useCartStore = create<CartState & CartActions>()(
  persist(
    immer((set, get) => ({
      ...initialState,

      getTotalItems: () => {
        const { carts } = get();
        return carts.reduce((total, item) => total + item.quantity, 0);
      },

      getTotalPrice: () => {
        const { carts } = get();
        return carts.reduce(
          (total, item) => total + item.price * item.quantity,
          0,
        );
      },

      addItem: (item) => {
        set((state) => {
          const existingItem = state.carts.find(
            (cartItem) => cartItem.id === item.id,
          );
          if (existingItem) {
            existingItem.quantity = item.quantity || 1;
          } else {
            state.carts.push({ ...item, quantity: item.quantity || 1 });
          }
        });
      },

      updateItem: (id, quantity) => {
        set((state) => {
          const existingCartItem = state.carts.find(
            (existingItem) => existingItem.id === id,
          );
          if (existingCartItem) {
            existingCartItem.quantity = quantity;
          }
        });
      },

      removeItem: (id) => {
        set((state) => {
          state.carts = state.carts.filter((item) => item.id !== id);
        });
      },

      clearCarts: () => set(initialState),
    })),
    {
      name: "cart",
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);
