import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ChatMessage } from '../types';

const MAX_MESSAGES = 100;

interface ChatState {
  messages: ChatMessage[];
  isLoading: boolean;
  setLoading: (loading: boolean) => void;
  addMessage: (role: 'user' | 'assistant', content: string) => void;
  clearHistory: () => void;
}

export const useChatStore = create<ChatState>()(
  persist(
    (set) => ({
      messages: [],
      isLoading: false,

      setLoading: (loading) => set({ isLoading: loading }),

      addMessage: (role, content) =>
        set((s) => {
          const msg: ChatMessage = {
            id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
            role,
            content,
            timestamp: Date.now(),
          };
          const messages = [...s.messages, msg].slice(-MAX_MESSAGES);
          return { messages };
        }),

      clearHistory: () => set({ messages: [] }),
    }),
    { name: 'wabi-chat' }
  )
);
