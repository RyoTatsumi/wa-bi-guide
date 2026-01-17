
import { Location, InterestCategory } from './types';

export const AGE_GROUPS = ['18–24', '25–34', '35–44', '45–54', '55–64', '65+'];
export const COMPANIONS = ['Solo', 'Couple', 'Friends', 'Family', 'Parents', 'Group'];
export const MOBILITY_OPTIONS = ['Stairs OK', 'No Stairs', 'No Hills', 'Wheelchair', 'Stroller', 'Walk 5km+'];
export const SUB_INTERESTS = ['Bushido', 'Castles', 'Ukiyo-e', 'Calligraphy', 'Zen Gardens', 'Haiku', 'Manga', 'Sake Craft', 'Ancient Statues', 'Silk Road Art'];
export const FOOD_LIKES = ['Sushi', 'Ramen', 'Kaiseki', 'Street Food', 'Matcha', 'Fermented'];
export const DIETARY_RESTRICTIONS = ['Vegan', 'Halal', 'Gluten-free', 'No Nuts', 'No Alcohol'];
export const SHOPPING_CATS = ['Tableware', 'Incense', 'Stationery', 'Textiles', 'Kitchen Knives'];
export const MATERIALS = ['Wood', 'Ceramic', 'Lacquer', 'Metal', 'Paper', 'Fabric'];
export const TABOOS = ['Crowds', 'Long Walks', 'Religious Sites'];

// 和の情緒を感じさせる厳選された画像URLプール
const JAPANESE_TEXTURES = [
  'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?q=80&w=2070', // Moss garden
  'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=2070', // Pagoda
  'https://images.unsplash.com/photo-1528360983277-13d401cdc186?q=80&w=2070', // Temple architecture
  'https://images.unsplash.com/photo-1542931287-023b922fa89b?q=80&w=2070', // Kyoto street
  'https://images.unsplash.com/photo-1506197603440-664426514781?q=80&w=2070', // Bamboo
  'https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?q=80&w=2070', // Torii gates
  'https://images.unsplash.com/photo-1478436127897-769e1b3f0f36?q=80&w=2070', // Stone path
];

export const INITIAL_LOCATIONS: Location[] = [
  // --- KYOTO (Cultural Core) ---
  { id: 'k1', name: 'Kiyomizu-dera', kanji: '清水寺', category: 'Culture', area: 'Kyoto', priority: 1, coordinates: { lat: 34.9949, lng: 135.7850 }, shortDescription: 'Pure Water Temple.', imageUrl: 'https://images.unsplash.com/photo-1528360983277-13d401cdc186?q=80&w=2070' },
  { id: 'k2', name: 'Yasaka Pagoda', kanji: '法観寺', category: 'Culture', area: 'Kyoto', priority: 1, coordinates: { lat: 34.9986, lng: 135.7794 }, shortDescription: 'Iconic pagoda.', imageUrl: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=2070' },
  { id: 'k3', name: 'Kodai-ji', kanji: '高台寺', category: 'Zen', area: 'Kyoto', priority: 2, coordinates: { lat: 35.0000, lng: 135.7811 }, shortDescription: 'Nenes temple.', imageUrl: 'https://images.unsplash.com/photo-1578469645742-46cae010e5d4?q=80&w=2070' },
  { id: 'k4', name: 'Kennin-ji', kanji: '建仁寺', category: 'Zen', area: 'Kyoto', priority: 1, coordinates: { lat: 35.0011, lng: 135.7735 }, shortDescription: 'Oldest Zen.', imageUrl: 'https://images.unsplash.com/photo-1533050487297-09b450131914?q=80&w=2070' },
  { id: 'k5', name: 'Gion Tatsumi Bridge', kanji: '辰巳大明神', category: 'DailyLife', area: 'Kyoto', priority: 2, coordinates: { lat: 35.0055, lng: 135.7738 }, shortDescription: 'Gion heart.', imageUrl: 'https://images.unsplash.com/photo-1533758671404-06d997235a94?q=80&w=2070' },
  { id: 'k6', name: 'Pontocho Alley', kanji: '先斗町', category: 'Food', area: 'Kyoto', priority: 2, coordinates: { lat: 35.0053, lng: 135.7710 }, shortDescription: 'Narrow magic.', imageUrl: 'https://images.unsplash.com/photo-1531816247963-c7b28072d65d?q=80&w=2070' },
  { id: 'k21', name: 'Tenryu-ji', kanji: '天龍寺', category: 'Zen', area: 'Kyoto', priority: 1, coordinates: { lat: 35.0158, lng: 135.6737 }, shortDescription: 'Cloud Dragon.', imageUrl: 'https://images.unsplash.com/photo-1582192732213-911ec542f534?q=80&w=2070' },
  { id: 'k22', name: 'Bamboo Forest', kanji: '竹林の小径', category: 'Nature', area: 'Kyoto', priority: 1, coordinates: { lat: 35.0169, lng: 135.6720 }, shortDescription: 'Whispering green.', imageUrl: 'https://images.unsplash.com/photo-1506197603440-664426514781?q=80&w=2070' },
  { id: 'k31', name: 'Fushimi Inari', kanji: '伏見稲荷', category: 'Culture', area: 'Kyoto', priority: 1, coordinates: { lat: 34.9671, lng: 135.7727 }, shortDescription: '1000 Torii.', imageUrl: 'https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?q=80&w=2070' },

  // --- OSAKA (Dynamic Soul) ---
  { id: 'o11', name: 'Dotonbori', kanji: '道頓堀', category: 'Food', area: 'Osaka', priority: 1, coordinates: { lat: 34.6687, lng: 135.5013 }, shortDescription: 'Neon feast.', imageUrl: 'https://images.unsplash.com/photo-15420518418c7-a29274095493?q=80&w=2070' },
  { id: 'o12', name: 'Namba Yasaka', kanji: '難波八阪神社', category: 'Culture', area: 'Osaka', priority: 1, coordinates: { lat: 34.6612, lng: 135.4965 }, shortDescription: 'Lion mouth.', imageUrl: 'https://images.unsplash.com/photo-1628153351608-f1c5c0888998?q=80&w=2070' },
  { id: 'o31', name: 'Osaka Castle', kanji: '大坂城', category: 'Samurai', area: 'Osaka', priority: 1, coordinates: { lat: 34.6873, lng: 135.5262 }, shortDescription: 'Shogun power.', imageUrl: 'https://images.unsplash.com/photo-1552074230-7756f7e91459?q=80&w=2070' },

  // --- NARA (Ancient Spirit) ---
  { id: 'n1', name: 'Todai-ji', kanji: '東大寺', category: 'Culture', area: 'Nara', priority: 1, coordinates: { lat: 34.6889, lng: 135.8398 }, shortDescription: 'Great Buddha.', imageUrl: 'https://images.unsplash.com/photo-1512466699224-9d93c778923a?q=80&w=2070' },
  { id: 'n2', name: 'Kofuku-ji', kanji: '興福寺', category: 'Culture', area: 'Nara', priority: 1, coordinates: { lat: 34.6831, lng: 135.8310 }, shortDescription: '5-story Pagoda.', imageUrl: 'https://images.unsplash.com/photo-1616147426363-f273ed48e30b?q=80&w=2070' },
  { id: 'n3', name: 'Kasuga Taisha', kanji: '春日大社', category: 'Culture', area: 'Nara', priority: 1, coordinates: { lat: 34.6814, lng: 135.8483 }, shortDescription: 'Lantern forest.', imageUrl: 'https://images.unsplash.com/photo-1565158145695-46740683a649?q=80&w=2070' },
];

const CATEGORIES: InterestCategory[] = ['Samurai', 'Zen', 'Craft', 'Culture', 'DailyLife', 'Anime', 'Nature', 'Food', 'Shopping'];
const AREAS: ('Kyoto' | 'Osaka' | 'Nara')[] = ['Kyoto', 'Osaka', 'Nara'];

AREAS.forEach(area => {
  const baseLoc = INITIAL_LOCATIONS.find(l => l.area === area);
  if (!baseLoc) return;
  
  for (let i = 0; i < 80; i++) {
    const lat = baseLoc.coordinates.lat + (Math.random() - 0.5) * 0.15;
    const lng = baseLoc.coordinates.lng + (Math.random() - 0.5) * 0.15;
    INITIAL_LOCATIONS.push({
      id: `${area.toLowerCase()}-extra-${i}`,
      name: `Hidden Spot ${i}`,
      kanji: `隠所 ${i}`,
      category: CATEGORIES[Math.floor(Math.random() * CATEGORIES.length)],
      area: area,
      priority: 3,
      coordinates: { lat, lng },
      shortDescription: 'A quiet resonance of history.',
      imageUrl: JAPANESE_TEXTURES[Math.floor(Math.random() * JAPANESE_TEXTURES.length)]
    });
  }
});
