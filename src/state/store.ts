import { create } from "zustand";

type Item = {
  name: string;
  price: number;
  quantity: number;
};

type CartState = {
  items: Item[];
  totalItems: number;
};

type Action = {
  addItem: (name: string, price: number) => void;
  minusItem: (name: string) => void;
  removeItem: (name: string) => void;
};

const useCartStore = create<CartState & Action>((set) => ({
  items: [],
  totalItems: 0,
  addItem: (name, price) =>
    set((state) => {
      const existingItem = state.items.find((item) => item.name === name);
      if (existingItem) {
        return {
          totalItems: state.totalItems + 1,
          items: state.items.map((item) =>
            item.name === name ? { ...item, quantity: item.quantity + 1 } : item
          ),
        };
      } else {
        return {
          totalItems: state.totalItems + 1,
          items: [...state.items, { name, price, quantity: 1 }],
        };
      }
    }),
  minusItem: (name) =>
    set((state) => {
      const existingItem = state.items.find((item) => item.name === name);

      if (existingItem && existingItem.quantity > 1) {
        return {
          totalItems: state.totalItems - 1,
          items: state.items.map((item) =>
            item.name === name ? { ...item, quantity: item.quantity - 1 } : item
          ),
        };
      } else {
        return {
          totalItems: state.totalItems - 1,
          items: state.items.filter((item) => item.name !== name),
        };
      }
    }),
  removeItem: (name) =>
    set((state) => {
      const existingItem = state.items.find((item) => item.name === name);
      const quantityToRemove = existingItem ? existingItem.quantity : 0;
      return {
        totalItems: state.totalItems - quantityToRemove,
        items: state.items.filter((item) => item.name !== name),
      };
    }),
}));

export default useCartStore;
