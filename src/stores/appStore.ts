import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { TabId, SubView, InterestCategory, Area, Location } from '../types';

interface AppState {
  currentTab: TabId;
  subView: SubView;
  activeArea: Area;
  activeLens: InterestCategory;
  userPosition: { lat: number; lng: number } | null;
  selectedLocation: Location | null;

  setTab: (tab: TabId) => void;
  setSubView: (view: SubView) => void;
  setActiveArea: (area: Area) => void;
  setActiveLens: (lens: InterestCategory) => void;
  setUserPosition: (pos: { lat: number; lng: number } | null) => void;
  setSelectedLocation: (loc: Location | null) => void;
  navigateToLocation: (loc: Location) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      currentTab: 'home',
      subView: 'main',
      activeArea: 'Kyoto',
      activeLens: 'Zen',
      userPosition: null,
      selectedLocation: null,

      setTab: (tab) => set({ currentTab: tab, subView: 'main' }),
      setSubView: (view) => set({ subView: view }),
      setActiveArea: (area) => set({ activeArea: area }),
      setActiveLens: (lens) => set({ activeLens: lens }),
      setUserPosition: (pos) => set({ userPosition: pos }),
      setSelectedLocation: (loc) => set({ selectedLocation: loc }),

      navigateToLocation: (loc) =>
        set({ selectedLocation: loc, subView: 'location-detail' }),
    }),
    {
      name: 'wabi-app',
      partialize: (state) => ({
        activeArea: state.activeArea,
        activeLens: state.activeLens,
      }),
    }
  )
);
