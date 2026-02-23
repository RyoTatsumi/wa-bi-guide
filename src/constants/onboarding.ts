import { InterestCategory } from '../types';

export const TRAVEL_STYLES = [
  { value: 'Planned' as const, label: 'Planned', description: 'I like detailed itineraries' },
  { value: 'Balanced' as const, label: 'Balanced', description: 'Some plans, some spontaneity' },
  { value: 'Spontaneous' as const, label: 'Spontaneous', description: 'I go where the wind takes me' },
];

export const DIETARY_RESTRICTIONS = ['Vegetarian', 'Vegan', 'Halal', 'Gluten-free', 'No Nuts', 'No Alcohol'];

export const LENS_OPTIONS: { value: InterestCategory; label: string; emoji: string }[] = [
  { value: 'Samurai', label: 'Samurai', emoji: '\u2694\uFE0F' },
  { value: 'Zen', label: 'Zen', emoji: '\uD83E\uDDD8' },
  { value: 'Craft', label: 'Craft', emoji: '\uD83C\uDFFA' },
  { value: 'Culture', label: 'Culture', emoji: '\u26E9\uFE0F' },
  { value: 'DailyLife', label: 'Daily Life', emoji: '\uD83C\uDFE0' },
  { value: 'Anime', label: 'Anime', emoji: '\uD83C\uDFAC' },
  { value: 'Nature', label: 'Nature', emoji: '\uD83C\uDF3F' },
  { value: 'Food', label: 'Food', emoji: '\uD83C\uDF63' },
  { value: 'Shopping', label: 'Shopping', emoji: '\uD83D\uDECD\uFE0F' },
];

export const AGE_GROUPS = ['18-24', '25-34', '35-44', '45-54', '55-64', '65+'];
export const COMPANIONS = ['Solo', 'Couple', 'Friends', 'Family', 'Parents', 'Group'];
export const MOBILITY_OPTIONS = ['Stairs OK', 'No Stairs', 'No Hills', 'Wheelchair', 'Stroller', 'Walk 5km+'];
export const FOOD_LIKES = ['Sushi', 'Ramen', 'Kaiseki', 'Street Food', 'Matcha', 'Fermented', 'Wagyu', 'Tempura'];
export const SHOPPING_CATS = ['Tableware', 'Incense', 'Stationery', 'Textiles', 'Kitchen Knives', 'Tea', 'Sake'];
export const MATERIALS = ['Wood', 'Ceramic', 'Lacquer', 'Metal', 'Paper', 'Fabric', 'Bamboo'];
export const TABOOS = ['Crowds', 'Long Walks', 'Religious Sites'];
export const SUB_INTERESTS = ['Bushido', 'Castles', 'Ukiyo-e', 'Calligraphy', 'Zen Gardens', 'Haiku', 'Manga', 'Sake Craft', 'Ancient Statues', 'Tea Ceremony'];
