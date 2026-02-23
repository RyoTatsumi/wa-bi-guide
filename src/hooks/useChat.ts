import { useCallback } from 'react';
import { useChatStore, useUserStore, useAppStore } from '../stores';
import { generateChatResponse } from '../services';
import { ConversationContext } from '../types';

export function useChat() {
  const { messages, isLoading, setLoading, addMessage, clearHistory } = useChatStore();
  const profile = useUserStore((s) => s.profile);
  const { userPosition, activeLens, activeArea } = useAppStore();

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
      },
      currentLocation: userPosition,
      activeLens,
      activeArea,
    };

    const allMessages = [
      ...useChatStore.getState().messages,
    ];

    const reply = await generateChatResponse(allMessages, context);
    addMessage('assistant', reply);
    setLoading(false);
  }, [profile, userPosition, activeLens, activeArea, addMessage, setLoading]);

  return { messages, isLoading, sendMessage, clearHistory };
}
