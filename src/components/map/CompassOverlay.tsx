import React from 'react';
import { useCompass } from '../../hooks/useCompass';
import { formatDistance } from '../../utils/geo';
import { Navigation } from 'lucide-react';

function bearingToDirection(bearing: number): string {
  const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
  const index = Math.round(bearing / 45) % 8;
  return directions[index];
}

const CompassOverlay: React.FC = () => {
  const targets = useCompass();

  if (targets.length === 0) return null;

  const nearest = targets[0];
  const direction = bearingToDirection(nearest.bearing);

  const handleNavigate = () => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(nearest.name)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="absolute top-14 left-3 right-3 z-[450]">
      <div className="bg-white/95 backdrop-blur-md rounded-lg px-3 py-2 shadow-md border border-gray-100 flex items-center gap-2">
        <div className="w-7 h-7 bg-japan-blue/10 rounded-full flex items-center justify-center flex-shrink-0">
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            style={{ transform: `rotate(${nearest.bearing}deg)` }}
          >
            <path d="M12 2L8 10h8L12 2z" fill="#1e3b7a" />
            <path d="M12 22L8 14h8l-4 8z" fill="#c5a059" opacity={0.5} />
          </svg>
        </div>

        <div className="flex-1 min-w-0">
          <p className="text-xs font-bold text-sumi-black truncate">
            {nearest.kanji} {nearest.name}
          </p>
          <p className="text-[10px] text-zen-gray">
            {formatDistance(nearest.distance)} {direction}
          </p>
        </div>

        <button
          onClick={handleNavigate}
          className="px-2 py-1.5 bg-japan-blue text-white rounded-md text-[10px] font-bold flex items-center gap-1 flex-shrink-0"
        >
          <Navigation size={10} />
          Go
        </button>
      </div>
    </div>
  );
};

export default CompassOverlay;
