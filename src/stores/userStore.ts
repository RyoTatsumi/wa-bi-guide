import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { UserProfile, DEFAULT_PROFILE, InterestCategory } from '../types';

interface UserState {
  profile: UserProfile;
  isOnboarded: boolean;
  tripStartDate: string | null;
  updateProfile: (partial: Partial<UserProfile>) => void;
  toggleArrayField: (field: keyof UserProfile, value: string) => void;
  dismissPrompt: (promptType: string) => void;
  completeOnboarding: () => void;
  resetProfile: () => void;
  getDayCount: () => number;
}

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      profile: DEFAULT_PROFILE,
      isOnboarded: false,
      tripStartDate: null,

      updateProfile: (partial) =>
        set((s) => ({ profile: { ...s.profile, ...partial } })),

      toggleArrayField: (field, value) =>
        set((s) => {
          const current = (s.profile[field] as string[]) || [];
          const next = current.includes(value)
            ? current.filter((v) => v !== value)
            : [...current, value];
          return { profile: { ...s.profile, [field]: next } };
        }),

      dismissPrompt: (promptType) =>
        set((s) => ({
          profile: {
            ...s.profile,
            dismissedPrompts: [...(s.profile.dismissedPrompts || []), promptType],
          },
        })),

      completeOnboarding: () =>
        set({ isOnboarded: true, tripStartDate: new Date().toISOString() }),

      resetProfile: () =>
        set({ profile: DEFAULT_PROFILE, isOnboarded: false, tripStartDate: null }),

      getDayCount: () => {
        const start = get().tripStartDate;
        if (!start) return 1;
        return Math.max(1, Math.ceil((Date.now() - new Date(start).getTime()) / 86400000));
      },
    }),
    { name: 'wabi-user' }
  )
);
