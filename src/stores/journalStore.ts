import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { JournalEntry } from '../types';

interface JournalState {
  entries: JournalEntry[];
  addEntry: (entry: Omit<JournalEntry, 'id' | 'date'>) => void;
  updateNote: (id: string, note: string) => void;
  getStats: () => { totalEntries: number; daysActive: number; placesVisited: number };
}

export const useJournalStore = create<JournalState>()(
  persist(
    (set, get) => ({
      entries: [],

      addEntry: (entry) =>
        set((s) => ({
          entries: [
            {
              ...entry,
              id: `journal-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
              date: Date.now(),
            },
            ...s.entries,
          ].slice(0, 500),
        })),

      updateNote: (id, note) =>
        set((s) => ({
          entries: s.entries.map((e) =>
            e.id === id ? { ...e, userNote: note } : e
          ),
        })),

      getStats: () => {
        const entries = get().entries;
        const days = new Set(
          entries.map((e) => new Date(e.date).toDateString())
        ).size;
        const places = new Set(
          entries.filter((e) => e.locationId).map((e) => e.locationId)
        ).size;
        return { totalEntries: entries.length, daysActive: days, placesVisited: places };
      },
    }),
    { name: 'wabi-journal' }
  )
);
