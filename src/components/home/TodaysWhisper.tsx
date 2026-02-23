import React, { useMemo } from 'react';
import { ChevronRight } from 'lucide-react';
import { useUserStore, useAppStore } from '../../stores';
import { LOCATIONS } from '../../constants';
import { Location } from '../../types';
import { useTranslation } from '../../i18n';

/**
 * Finds the nearest location matching the user's active lens.
 * Falls back to any location in the active area if no lens match is nearby.
 */
function findNearestMatchingLocation(
  userPosition: { lat: number; lng: number } | null,
  activeLens: string,
  activeArea: string
): Location | null {
  // Filter locations by lens, then by area as fallback
  let candidates = LOCATIONS.filter((loc) => loc.category === activeLens);
  if (candidates.length === 0) {
    candidates = LOCATIONS.filter((loc) => loc.area === activeArea);
  }
  if (candidates.length === 0) {
    candidates = LOCATIONS;
  }

  if (!userPosition) {
    // No position: pick highest priority in the active area first
    const areaMatches = candidates.filter((loc) => loc.area === activeArea);
    const pool = areaMatches.length > 0 ? areaMatches : candidates;
    return pool.sort((a, b) => a.priority - b.priority)[0] ?? null;
  }

  // Sort by distance to user
  const toRad = (deg: number) => (deg * Math.PI) / 180;
  const getDistance = (loc: Location) => {
    const dLat = toRad(loc.coordinates.lat - userPosition.lat);
    const dLng = toRad(loc.coordinates.lng - userPosition.lng);
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(toRad(userPosition.lat)) *
        Math.cos(toRad(loc.coordinates.lat)) *
        Math.sin(dLng / 2) ** 2;
    return 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  };

  return candidates.sort((a, b) => getDistance(a) - getDistance(b))[0] ?? null;
}

const TodaysWhisper: React.FC = () => {
  const { t } = useTranslation();
  const profile = useUserStore((s) => s.profile);
  const userPosition = useAppStore((s) => s.userPosition);
  const activeLens = useAppStore((s) => s.activeLens);
  const activeArea = useAppStore((s) => s.activeArea);
  const navigateToLocation = useAppStore((s) => s.navigateToLocation);

  const location = useMemo(
    () => findNearestMatchingLocation(userPosition, activeLens, activeArea),
    [userPosition, activeLens, activeArea]
  );

  if (!location) return null;

  return (
    <div className="p-5 bg-white border border-gray-100 rounded-xl shadow-sm">
      {/* Section label */}
      <div className="text-xs text-kintsugi-gold uppercase tracking-widest font-bold mb-3">
        {t('home.todaysWhisper')}
      </div>

      {/* Location info */}
      <div className="mb-3">
        <span className="text-zen-gray text-sm mr-2">{location.kanji}</span>
        <span className="font-serif font-bold text-sumi-black">
          {location.name}
        </span>
      </div>

      <p className="text-sm text-zen-gray italic mb-4">
        {location.shortDescription}
      </p>

      {/* Learn More */}
      <button
        onClick={() => navigateToLocation(location)}
        className="inline-flex items-center gap-1 text-japan-blue text-xs font-bold"
      >
        {t('home.learnMore')}
        <ChevronRight size={14} />
      </button>
    </div>
  );
};

export default TodaysWhisper;
