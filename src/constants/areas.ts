import { Area } from '../types';

export const AREA_CENTERS: Record<Area, { lat: number; lng: number }> = {
  Kyoto: { lat: 35.0116, lng: 135.7681 },
  Osaka: { lat: 34.6937, lng: 135.5023 },
  Nara: { lat: 34.6851, lng: 135.8327 },
};

export const REGIONAL_MARKERS = [
  { name: 'Kyoto Central', kanji: '京都', coords: [35.0116, 135.7681] as [number, number], color: '#1e3b7a', type: 'city' as const },
  { name: 'Arashiyama', kanji: '嵐山', coords: [35.0169, 135.6720] as [number, number], color: '#2d6a4f', type: 'district' as const },
  { name: 'Higashiyama', kanji: '東山', coords: [34.9949, 135.7850] as [number, number], color: '#b23a48', type: 'district' as const },
  { name: 'Osaka Central', kanji: '大阪', coords: [34.6937, 135.5023] as [number, number], color: '#e67e22', type: 'city' as const },
  { name: 'Namba', kanji: '難波', coords: [34.6687, 135.5013] as [number, number], color: '#ff4d6d', type: 'district' as const },
  { name: 'Shinsekai', kanji: '新世界', coords: [34.6525, 135.5063] as [number, number], color: '#4a4e69', type: 'district' as const },
  { name: 'Nara Central', kanji: '奈良', coords: [34.6851, 135.8327] as [number, number], color: '#2d6a4f', type: 'city' as const },
  { name: 'Nishinokyo', kanji: '西ノ京', coords: [34.6685, 135.7842] as [number, number], color: '#c5a059', type: 'district' as const },
];
