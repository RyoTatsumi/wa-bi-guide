import { useCallback } from 'react';
import { useChatStore, useUserStore, useAppStore } from '../stores';
import { generateChatResponse } from '../services';
import { ConversationContext } from '../types';
import { useAutoJournal } from './useAutoJournal';

export function useChat() {
  const { messages, isLoading, setLoading, addMessage, clearHistory } = useChatStore();
  const profile = useUserStore((s) => s.profile);
  const { userPosition, activeLens, activeArea } = useAppStore();
  const { logChatSummary } = useAutoJournal();

  const sendMessage = useCallback(async (text: string) => {
    addMessage('user', text);
    setLoading(true);

    const context: ConversationContext = {
      userProfile: {
        name: profile.name,
        travelStyle: profile.travelStyle,
        primaryLenses: profile.primaryLenses,
        dietaryRestrictions: profile.dietaryRestrictions,
        foodLikes: profile.foodLikes,
        mobility: profile.mobility,
        subInterests: profile.subInterests,
      },
      currentLocation: userPosition,
      activeLens,
      activeArea,
      language: profile.language,
    };

    const allMessages = [
      ...useChatStore.getState().messages,
    ];

    const reply = await generateChatResponse(allMessages, context);
    addMessage('assistant', reply);
    logChatSummary(text);
    setLoading(false);
  }, [profile, userPosition, activeLens, activeArea, addMessage, setLoading, logChatSummary]);

  return { messages, isLoading, sendMessage, clearHistory };
}
