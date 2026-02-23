import { useMemo } from 'react';
import { useAppStore } from '../stores';
import { LOCATIONS } from '../constants';
import { CompassTarget, Location } from '../types';
import { calculateBearing, calculateDistance, formatDistance } from '../utils/geo';

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
