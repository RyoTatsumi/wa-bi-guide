import React from 'react';
import { MapPin, ChevronRight } from 'lucide-react';
import { useNearbyLocations } from '../../hooks/useNearbyLocations';
import { useUserStore, useAppStore } from '../../stores';
import { formatDistance } from '../../utils/geo';
import { useTranslation } from '../../i18n';

const NearbyDiscovery: React.FC = () => {
  const { t } = useTranslation();
  const profile = useUserStore((s) => s.profile);
  const navigateToLocation = useAppStore((s) => s.navigateToLocation);
  const nearby = useNearbyLocations(5000);

  const sorted = [...nearby]
    .sort((a, b) => {
      const aMatch = profile.primaryLenses.includes(a.location.category as any)
        ? -1
        : 0;
      const bMatch = profile.primaryLenses.includes(b.location.category as any)
        ? -1
        : 0;
      return aMatch - bMatch || a.distance - b.distance;
    })
    .slice(0, 3);

  if (sorted.length === 0) return null;

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 text-kintsugi-gold">
        <MapPin size={14} />
        <span className="text-xs uppercase tracking-widest font-bold">
          {t('home.nearbyDiscovery')}
        </span>
      </div>
      {sorted.map(({ location, distance }) => (
        <button
          key={location.id}
          onClick={() => navigateToLocation(location)}
          className="w-full p-4 bg-white border border-gray-100 rounded-xl shadow-sm flex items-center gap-4 text-left transition-all active:scale-[0.98]"
        >
          <img
            src={location.imageUrl}
            alt=""
            className="w-14 h-14 rounded-lg object-cover"
          />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-zen-gray text-xs">{location.kanji}</span>
              <span className="text-xs px-1.5 py-0.5 bg-gray-100 rounded-full text-zen-gray">
                {formatDistance(distance)}
              </span>
            </div>
            <span className="font-serif font-bold text-sumi-black text-sm truncate block">
              {location.name}
            </span>
            <p className="text-xs text-zen-gray truncate">
              {location.shortDescription}
            </p>
          </div>
          <ChevronRight size={16} className="text-zen-gray shrink-0" />
        </button>
      ))}
    </div>
  );
};

export default NearbyDiscovery;
