import React from 'react';
import { X } from 'lucide-react';
import { Location } from '../../types';

interface LocationPreviewProps {
  location: Location | null;
  onClose: () => void;
  onLearnMore: () => void;
}

const LocationPreview: React.FC<LocationPreviewProps> = ({
  location,
  onClose,
  onLearnMore,
}) => {
  if (!location) return null;

  return (
    <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl shadow-2xl z-[500] animate-slide-up">
      <button
        onClick={onClose}
        className="absolute top-3 right-3 w-8 h-8 bg-black/30 rounded-full flex items-center justify-center z-10"
      >
        <X size={16} className="text-white" />
      </button>

      <div
        className="h-32 w-full bg-cover bg-center rounded-t-2xl"
        style={{ backgroundImage: `url(${location.imageUrl})` }}
      />

      <div className="p-4 space-y-3">
        <div>
          <p className="text-xs text-zen-gray">{location.kanji}</p>
          <h3 className="text-lg font-bold text-sumi-black">{location.name}</h3>
        </div>

        <p className="text-sm text-zen-gray leading-relaxed">
          {location.shortDescription}
        </p>

        <span className="inline-block px-2 py-1 bg-gray-100 rounded-full text-xs text-zen-gray">
          {location.category}
        </span>

        <button
          onClick={onLearnMore}
          className="w-full py-3 bg-japan-blue text-white rounded-lg text-sm font-bold transition-colors hover:bg-japan-blue/90"
        >
          Learn More
        </button>
      </div>
    </div>
  );
};

export default LocationPreview;
