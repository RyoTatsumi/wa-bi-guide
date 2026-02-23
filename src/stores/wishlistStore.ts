import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { WishlistItem } from '../types';

interface WishlistState {
  items: WishlistItem[];
  addItem: (item: Omit<WishlistItem, 'id' | 'addedAt'>) => void;
  removeItem: (id: string) => void;
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set) => ({
      items: [],

      addItem: (item) =>
        set((s) => ({
          items: [
            ...s.items,
            {
              ...item,
              id: `wish-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
              addedAt: Date.now(),
            },
          ],
        })),

      removeItem: (id) =>
        set((s) => ({ items: s.items.filter((i) => i.id !== id) })),
    }),
    { name: 'wabi-wishlist' }
  )
);
