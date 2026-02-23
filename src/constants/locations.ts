import { Location } from '../types';

const JAPANESE_TEXTURES = [
  'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?q=80&w=2070',
  'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=2070',
  'https://images.unsplash.com/photo-1528360983277-13d401cdc186?q=80&w=2070',
  'https://images.unsplash.com/photo-1542931287-023b922fa89b?q=80&w=2070',
  'https://images.unsplash.com/photo-1506197603440-664426514781?q=80&w=2070',
  'https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?q=80&w=2070',
  'https://images.unsplash.com/photo-1478436127897-769e1b3f0f36?q=80&w=2070',
];

export const LOCATIONS: Location[] = [
  // --- KYOTO ---
  { id: 'k1', name: 'Kiyomizu-dera', kanji: '清水寺', category: 'Culture', area: 'Kyoto', priority: 1, coordinates: { lat: 34.9949, lng: 135.7850 }, shortDescription: 'UNESCO temple famous for its wooden stage with stunning city views.', imageUrl: 'https://images.unsplash.com/photo-1528360983277-13d401cdc186?q=80&w=2070' },
  { id: 'k2', name: 'Yasaka Pagoda', kanji: '法観寺', category: 'Culture', area: 'Kyoto', priority: 1, coordinates: { lat: 34.9986, lng: 135.7794 }, shortDescription: 'Iconic five-story pagoda in the Higashiyama district.', imageUrl: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=2070' },
  { id: 'k3', name: 'Kodai-ji', kanji: '高台寺', category: 'Zen', area: 'Kyoto', priority: 2, coordinates: { lat: 35.0000, lng: 135.7811 }, shortDescription: 'Beautiful Zen temple built for Lady Nene.', imageUrl: 'https://images.unsplash.com/photo-1578469645742-46cae010e5d4?q=80&w=2070' },
  { id: 'k4', name: 'Kennin-ji', kanji: '建仁寺', category: 'Zen', area: 'Kyoto', priority: 1, coordinates: { lat: 35.0011, lng: 135.7735 }, shortDescription: 'The oldest Zen temple in Kyoto, home to the Twin Dragons ceiling.', imageUrl: 'https://images.unsplash.com/photo-1533050487297-09b450131914?q=80&w=2070' },
  { id: 'k5', name: 'Gion Tatsumi Bridge', kanji: '辰巳大明神', category: 'DailyLife', area: 'Kyoto', priority: 2, coordinates: { lat: 35.0055, lng: 135.7738 }, shortDescription: 'The heart of Gion geisha district.', imageUrl: 'https://images.unsplash.com/photo-1533758671404-06d997235a94?q=80&w=2070' },
  { id: 'k6', name: 'Pontocho Alley', kanji: '先斗町', category: 'Food', area: 'Kyoto', priority: 2, coordinates: { lat: 35.0053, lng: 135.7710 }, shortDescription: 'Atmospheric narrow alley lined with restaurants and bars.', imageUrl: 'https://images.unsplash.com/photo-1531816247963-c7b28072d65d?q=80&w=2070' },
  { id: 'k7', name: 'Tenryu-ji', kanji: '天龍寺', category: 'Zen', area: 'Kyoto', priority: 1, coordinates: { lat: 35.0158, lng: 135.6737 }, shortDescription: 'World Heritage Zen temple with stunning garden in Arashiyama.', imageUrl: 'https://images.unsplash.com/photo-1582192732213-911ec542f534?q=80&w=2070' },
  { id: 'k8', name: 'Bamboo Forest', kanji: '竹林の小径', category: 'Nature', area: 'Kyoto', priority: 1, coordinates: { lat: 35.0169, lng: 135.6720 }, shortDescription: 'Otherworldly path through towering bamboo groves.', imageUrl: 'https://images.unsplash.com/photo-1506197603440-664426514781?q=80&w=2070' },
  { id: 'k9', name: 'Fushimi Inari', kanji: '伏見稲荷', category: 'Culture', area: 'Kyoto', priority: 1, coordinates: { lat: 34.9671, lng: 135.7727 }, shortDescription: 'Thousands of vermillion torii gates climbing the mountain.', imageUrl: 'https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?q=80&w=2070' },
  { id: 'k10', name: 'Kinkaku-ji', kanji: '金閣寺', category: 'Culture', area: 'Kyoto', priority: 1, coordinates: { lat: 35.0394, lng: 135.7292 }, shortDescription: 'The Golden Pavilion reflected in a mirror pond.', imageUrl: JAPANESE_TEXTURES[0] },
  { id: 'k11', name: 'Ryoan-ji', kanji: '龍安寺', category: 'Zen', area: 'Kyoto', priority: 1, coordinates: { lat: 35.0345, lng: 135.7185 }, shortDescription: 'Home to Japan\'s most famous rock garden.', imageUrl: JAPANESE_TEXTURES[6] },
  { id: 'k12', name: 'Nishiki Market', kanji: '錦市場', category: 'Food', area: 'Kyoto', priority: 1, coordinates: { lat: 35.0050, lng: 135.7649 }, shortDescription: 'Kyoto\'s kitchen - a 400-year-old food market.', imageUrl: JAPANESE_TEXTURES[3] },
  { id: 'k13', name: 'Philosopher\'s Path', kanji: '哲学の道', category: 'Nature', area: 'Kyoto', priority: 2, coordinates: { lat: 35.0230, lng: 135.7940 }, shortDescription: 'Peaceful canal-side walk between temples.', imageUrl: JAPANESE_TEXTURES[6] },
  { id: 'k14', name: 'Ginkaku-ji', kanji: '銀閣寺', category: 'Zen', area: 'Kyoto', priority: 1, coordinates: { lat: 35.0268, lng: 135.7982 }, shortDescription: 'The Silver Pavilion, a masterpiece of wabi-sabi aesthetics.', imageUrl: JAPANESE_TEXTURES[0] },
  { id: 'k15', name: 'Tofuku-ji', kanji: '東福寺', category: 'Zen', area: 'Kyoto', priority: 2, coordinates: { lat: 34.9762, lng: 135.7740 }, shortDescription: 'Stunning autumn foliage and Zen gardens.', imageUrl: JAPANESE_TEXTURES[0] },
  { id: 'k16', name: 'Nijo Castle', kanji: '二条城', category: 'Samurai', area: 'Kyoto', priority: 1, coordinates: { lat: 35.0142, lng: 135.7480 }, shortDescription: 'Tokugawa shogunate castle with nightingale floors.', imageUrl: JAPANESE_TEXTURES[2] },
  { id: 'k17', name: 'Kamigamo Shrine', kanji: '上賀茂神社', category: 'Culture', area: 'Kyoto', priority: 2, coordinates: { lat: 35.0597, lng: 135.7527 }, shortDescription: 'One of Kyoto\'s oldest shrines, UNESCO heritage.', imageUrl: JAPANESE_TEXTURES[5] },

  // --- OSAKA ---
  { id: 'o1', name: 'Dotonbori', kanji: '道頓堀', category: 'Food', area: 'Osaka', priority: 1, coordinates: { lat: 34.6687, lng: 135.5013 }, shortDescription: 'Osaka\'s iconic neon-lit food and entertainment district.', imageUrl: JAPANESE_TEXTURES[3] },
  { id: 'o2', name: 'Namba Yasaka', kanji: '難波八阪神社', category: 'Culture', area: 'Osaka', priority: 1, coordinates: { lat: 34.6612, lng: 135.4965 }, shortDescription: 'Shrine famous for its giant lion head stage.', imageUrl: JAPANESE_TEXTURES[5] },
  { id: 'o3', name: 'Osaka Castle', kanji: '大坂城', category: 'Samurai', area: 'Osaka', priority: 1, coordinates: { lat: 34.6873, lng: 135.5262 }, shortDescription: 'Toyotomi Hideyoshi\'s legendary castle.', imageUrl: JAPANESE_TEXTURES[2] },
  { id: 'o4', name: 'Shinsekai', kanji: '新世界', category: 'Food', area: 'Osaka', priority: 1, coordinates: { lat: 34.6525, lng: 135.5063 }, shortDescription: 'Retro neighborhood known for kushikatsu and Tsutenkaku Tower.', imageUrl: JAPANESE_TEXTURES[3] },
  { id: 'o5', name: 'Kuromon Market', kanji: '黒門市場', category: 'Food', area: 'Osaka', priority: 1, coordinates: { lat: 34.6665, lng: 135.5076 }, shortDescription: 'Osaka\'s kitchen - fresh seafood and street food paradise.', imageUrl: JAPANESE_TEXTURES[3] },
  { id: 'o6', name: 'Shitennoji', kanji: '四天王寺', category: 'Culture', area: 'Osaka', priority: 2, coordinates: { lat: 34.6535, lng: 135.5165 }, shortDescription: 'One of Japan\'s oldest temples, founded 593 AD.', imageUrl: JAPANESE_TEXTURES[2] },
  { id: 'o7', name: 'Sumiyoshi Taisha', kanji: '住吉大社', category: 'Culture', area: 'Osaka', priority: 2, coordinates: { lat: 34.6125, lng: 135.4927 }, shortDescription: 'Ancient shrine with distinctive architectural style.', imageUrl: JAPANESE_TEXTURES[5] },

  // --- NARA ---
  { id: 'n1', name: 'Todai-ji', kanji: '東大寺', category: 'Culture', area: 'Nara', priority: 1, coordinates: { lat: 34.6889, lng: 135.8398 }, shortDescription: 'Home to Japan\'s largest bronze Buddha statue.', imageUrl: 'https://images.unsplash.com/photo-1512466699224-9d93c778923a?q=80&w=2070' },
  { id: 'n2', name: 'Kofuku-ji', kanji: '興福寺', category: 'Culture', area: 'Nara', priority: 1, coordinates: { lat: 34.6831, lng: 135.8310 }, shortDescription: 'Historic temple complex with stunning five-story pagoda.', imageUrl: JAPANESE_TEXTURES[1] },
  { id: 'n3', name: 'Kasuga Taisha', kanji: '春日大社', category: 'Culture', area: 'Nara', priority: 1, coordinates: { lat: 34.6814, lng: 135.8483 }, shortDescription: 'Forest shrine with thousands of stone and bronze lanterns.', imageUrl: 'https://images.unsplash.com/photo-1565158145695-46740683a649?q=80&w=2070' },
  { id: 'n4', name: 'Nara Park', kanji: '奈良公園', category: 'Nature', area: 'Nara', priority: 1, coordinates: { lat: 34.6851, lng: 135.8377 }, shortDescription: 'Vast park where friendly deer roam freely.', imageUrl: JAPANESE_TEXTURES[0] },
  { id: 'n5', name: 'Isuien Garden', kanji: '依水園', category: 'Zen', area: 'Nara', priority: 2, coordinates: { lat: 34.6870, lng: 135.8363 }, shortDescription: 'Exquisite traditional garden with views of Todai-ji.', imageUrl: JAPANESE_TEXTURES[0] },
  { id: 'n6', name: 'Naramachi', kanji: 'ならまち', category: 'DailyLife', area: 'Nara', priority: 2, coordinates: { lat: 34.6780, lng: 135.8310 }, shortDescription: 'Historic merchant quarter with machiya townhouses.', imageUrl: JAPANESE_TEXTURES[3] },
];
