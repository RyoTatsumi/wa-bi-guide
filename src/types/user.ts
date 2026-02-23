export type InterestCategory = 'Samurai' | 'Zen' | 'Craft' | 'Culture' | 'DailyLife' | 'Anime' | 'Nature' | 'Food' | 'Shopping';

export interface UserProfile {
  name: string;
  language: 'en' | 'ja';
  travelStyle: 'Planned' | 'Balanced' | 'Spontaneous';
  dietaryRestrictions: string[];
  primaryLenses: InterestCategory[];

  // Progressive fields (collected during usage)
  ageGroup?: string;
  companions?: string;
  foodLikes?: string[];
  shoppingCategories?: string[];
  materials?: string[];
  shippingNeeded?: boolean;
  mobility?: string[];
  dailyPace?: string;
  crowdTolerance?: string;
  learningDepth?: 'Light' | 'Story' | 'Deep' | 'Academic';
  taboos?: string[];
  subInterests?: string[];
  dismissedPrompts?: string[];
}

export const DEFAULT_PROFILE: UserProfile = {
  name: '',
  language: 'en',
  travelStyle: 'Balanced',
  dietaryRestrictions: [],
  primaryLenses: [],
};
