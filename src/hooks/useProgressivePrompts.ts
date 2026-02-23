import { useMemo } from 'react';
import { useUserStore } from '../stores';
import { useLocationStore } from '../stores';
import { useChatStore } from '../stores';
import { useWishlistStore } from '../stores';

export type PromptType = 'travelStyle' | 'subInterests' | 'shoppingPrefs';

export interface ProgressivePrompt {
  type: PromptType;
  translationKey: string;
  params?: Record<string, string | number>;
}

export function useProgressivePrompts(): ProgressivePrompt[] {
  const profile = useUserStore((s) => s.profile);
  const messageCount = useChatStore((s) => s.messages.length);
  const visitedCount = useLocationStore((s) => s.visitedIds.length);
  const wishlistCount = useWishlistStore((s) => s.items.length);
  const dismissed = profile.dismissedPrompts || [];

  return useMemo(() => {
    const prompts: ProgressivePrompt[] = [];

    if (
      messageCount >= 2 &&
      profile.travelStyle === 'Balanced' &&
      !dismissed.includes('travelStyle')
    ) {
      prompts.push({
        type: 'travelStyle',
        translationKey: 'prompt.addTravelStyle',
      });
    }

    if (
      visitedCount >= 3 &&
      (!profile.subInterests || profile.subInterests.length === 0) &&
      !dismissed.includes('subInterests')
    ) {
      prompts.push({
        type: 'subInterests',
        translationKey: 'prompt.addSubInterests',
        params: { count: visitedCount },
      });
    }

    if (
      wishlistCount >= 1 &&
      (!profile.shoppingCategories || profile.shoppingCategories.length === 0) &&
      !dismissed.includes('shoppingPrefs')
    ) {
      prompts.push({
        type: 'shoppingPrefs',
        translationKey: 'prompt.addShoppingPrefs',
      });
    }

    return prompts;
  }, [messageCount, visitedCount, wishlistCount, profile, dismissed]);
}
