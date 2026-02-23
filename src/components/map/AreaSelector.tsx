import React from 'react';
import { useAppStore } from '../../stores';
import { AREA_CENTERS } from '../../constants';
import { Area } from '../../types';

const AREAS: Area[] = ['Kyoto', 'Osaka', 'Nara'];

const AreaSelector: React.FC = () => {
  const activeArea = useAppStore((s) => s.activeArea);
  const setActiveArea = useAppStore((s) => s.setActiveArea);

  return (
    <div className="flex gap-1 bg-white/80 p-1 rounded-lg backdrop-blur-md border border-gray-100 shadow-lg">
      {AREAS.map((area) => (
        <button
          key={area}
          onClick={() => setActiveArea(area)}
          className={`flex-1 py-2 rounded-lg text-xs font-bold tracking-wider uppercase transition-colors ${
            activeArea === area
              ? 'bg-japan-blue text-white'
              : 'text-zen-gray hover:bg-gray-50'
          }`}
        >
          {area}
        </button>
      ))}
    </div>
  );
};

export default AreaSelector;
