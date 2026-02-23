export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

export interface ConversationContext {
  userProfile: {
    name: string;
    travelStyle: string;
    primaryLenses: string[];
    dietaryRestrictions: string[];
    foodLikes?: string[];
    mobility?: string[];
  };
  currentLocation: { lat: number; lng: number } | null;
  activeLens: string;
  activeArea: string;
  language: 'en' | 'ja';
}
