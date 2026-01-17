
export type InterestCategory = 'Samurai' | 'Zen' | 'Craft' | 'Culture' | 'DailyLife' | 'Anime' | 'Nature' | 'Food' | 'Shopping';

export interface UserProfile {
  name: string;
  ageGroup: string;
  companions: 'Solo' | 'Couple' | 'Friends' | 'Family' | 'Parents' | 'Group';
  travelStyle: 'Planned' | 'Semi-planned' | 'Spontaneous';
  stayDuration: string;
  mobility: string[];
  language: string;
  primaryLenses: InterestCategory[];
  subInterests: string[];
  foodLikes: string[];
  foodDislikes: string[];
  dietaryRestrictions: string[];
  foodBehavior: {
    reservation: boolean;
    maxWaitTime: number;
    priceRange: string;
    adventureLevel: 'Safe' | 'Adventurous';
  };
  shoppingPurpose: string[];
  shoppingCategories: string[];
  materials: string[];
  shippingNeeded: boolean;
  dailyPace: '1-2 spots' | '3-4 spots' | '5-6+ spots';
  crowdTolerance: 'Low' | 'Medium' | 'High';
  photographyLevel: 'None' | 'Casual' | 'Serious';
  learningDepth: 'Light' | 'Story' | 'Deep' | 'Academic';
  taboos: string[];
  customTags: string[];
}

export interface Location {
  id: string;
  name: string;
  kanji: string;
  category: InterestCategory;
  coordinates: { lat: number; lng: number };
  shortDescription: string;
  imageUrl: string;
  area: 'Kyoto' | 'Osaka' | 'Nara';
  priority: number; // 1: Major, 2: Secondary, 3: Hidden Gem
  tags?: string[];
}

export interface PhilosophyContent {
  title: string;
  personalLensText: string;
  historicalContext: string;
  taruWoShiruLesson: string;
  personalizedTips: {
    food?: string;
    shopping?: string;
    warning?: string;
  };
}

export type ViewState = 'onboarding' | 'map' | 'knowledge' | 'booking' | 'shop' | 'profile';
