import { useMemo } from 'react';
import { useAppStore } from '../stores';
import { LOCATIONS } from '../constants';
import { CompassTarget, Location } from '../types';

function toRad(deg: number): number {
  return (deg * Math.PI) / 180;
}

function toDeg(rad: number): number {
  return (rad * 180) / Math.PI;
}

function calculateBearing(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const dLng = toRad(lng2 - lng1);
  const y = Math.sin(dLng) * Math.cos(toRad(lat2));
  const x = Math.cos(toRad(lat1)) * Math.sin(toRad(lat2)) -
    Math.sin(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.cos(dLng);
  return (toDeg(Math.atan2(y, x)) + 360) % 360;
}

function calculateDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371000; // meters
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a = Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function formatDistance(meters: number): string {
  if (meters < 1000) return `${Math.round(meters)}m`;
  return `${(meters / 1000).toFixed(1)}km`;
}

export function useCompass(): CompassTarget[] {
  const userPosition = useAppStore((s) => s.userPosition);
  const activeLens = useAppStore((s) => s.activeLens);
  const activeArea = useAppStore((s) => s.activeArea);

  return useMemo(() => {
    if (!userPosition) return [];

    const filtered = LOCATIONS.filter(
      (loc) => loc.area === activeArea && (loc.category === activeLens || loc.priority === 1)
    );

    return filtered
      .map((loc) => ({
        locationId: loc.id,
        name: loc.name,
        kanji: loc.kanji,
        bearing: calculateBearing(
          userPosition.lat, userPosition.lng,
          loc.coordinates.lat, loc.coordinates.lng
        ),
        distance: calculateDistance(
          userPosition.lat, userPosition.lng,
          loc.coordinates.lat, loc.coordinates.lng
        ),
        category: loc.category,
        description: loc.shortDescription,
      }))
      .sort((a, b) => a.distance - b.distance)
      .slice(0, 5);
  }, [userPosition, activeLens, activeArea]);
}

export { formatDistance };
