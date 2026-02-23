import { useMemo } from 'react';
import { useAppStore } from '../stores';
import { LOCATIONS } from '../constants';
import { Location } from '../types';
import { calculateDistance } from '../utils/geo';

export interface NearbyLocation {
  location: Location;
  distance: number;
}

export function useNearbyLocations(radiusMeters: number = 5000): NearbyLocation[] {
  const userPosition = useAppStore((s) => s.userPosition);

  return useMemo(() => {
    if (!userPosition) return [];
    return LOCATIONS
      .map((loc) => ({
        location: loc,
        distance: calculateDistance(
          userPosition.lat,
          userPosition.lng,
          loc.coordinates.lat,
          loc.coordinates.lng
        ),
      }))
      .filter((item) => item.distance <= radiusMeters)
      .sort((a, b) => a.distance - b.distance);
  }, [userPosition, radiusMeters]);
}
