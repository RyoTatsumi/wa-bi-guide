import { InterestCategory } from './user';

export type Area = 'Kyoto' | 'Osaka' | 'Nara';

export interface Location {
  id: string;
  name: string;
  kanji: string;
  category: InterestCategory;
  coordinates: { lat: number; lng: number };
  shortDescription: string;
  imageUrl: string;
  area: Area;
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
