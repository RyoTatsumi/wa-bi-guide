import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface LocationState {
  visitedIds: string[];
  favoriteIds: string[];
  markVisited: (id: string) => void;
  toggleFavorite: (id: string) => void;
}

export const useLocationStore = create<LocationState>()(
  persist(
    (set) => ({
      visitedIds: [],
      favoriteIds: [],

      markVisited: (id) =>
        set((s) => ({
          visitedIds: s.visitedIds.includes(id) ? s.visitedIds : [...s.visitedIds, id],
        })),

      toggleFavorite: (id) =>
        set((s) => ({
          favoriteIds: s.favoriteIds.includes(id)
            ? s.favoriteIds.filter((v) => v !== id)
            : [...s.favoriteIds, id],
        })),
    }),
    { name: 'wabi-locations' }
  )
);
