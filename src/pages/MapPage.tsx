import React, { useCallback } from 'react';
import { Navigation } from 'lucide-react';
import { useAppStore } from '../stores';
import { useGeolocation } from '../hooks/useGeolocation';
import { Location } from '../types';
import MapCanvas from '../components/map/MapCanvas';
import AreaSelector from '../components/map/AreaSelector';
import CompassOverlay from '../components/map/CompassOverlay';
import LocationPreview from '../components/map/LocationPreview';
import LocationDetailPage from './LocationDetailPage';
import BookingPage from './BookingPage';
import LensPage from './LensPage';

const MapPage: React.FC = () => {
  const subView = useAppStore((s) => s.subView);
  const selectedLocation = useAppStore((s) => s.selectedLocation);
  const setSelectedLocation = useAppStore((s) => s.setSelectedLocation);
  const navigateToLocation = useAppStore((s) => s.navigateToLocation);
  const { refreshPosition } = useGeolocation();

  // Sub-view routing
  if (subView === 'location-detail') return <LocationDetailPage />;
  if (subView === 'booking') return <BookingPage />;
  if (subView === 'lens') return <LensPage />;

  const handleLocationSelect = (location: Location) => {
    setSelectedLocation(location);
  };

  const handleClose = () => {
    setSelectedLocation(null);
  };

  const handleLearnMore = () => {
    if (selectedLocation) {
      navigateToLocation(selectedLocation);
    }
  };

  return (
    <div className="w-full h-full relative">
      <MapCanvas onLocationSelect={handleLocationSelect} />

      <div className="absolute top-4 left-4 right-4 z-[500]">
        <AreaSelector />
      </div>

      <CompassOverlay />

      <LocationPreview
        location={selectedLocation}
        onClose={handleClose}
        onLearnMore={handleLearnMore}
      />

      <button
        onClick={refreshPosition}
        className="absolute bottom-20 right-4 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center z-[400] border border-gray-100 active:scale-90 transition-transform"
      >
        <Navigation size={20} className="text-japan-blue" />
      </button>

      <div className="absolute bottom-4 left-0 right-0 flex justify-center z-[300] pointer-events-none">
        <span className="text-xs text-zen-gray/70 bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full">
          Zoom in to discover hidden gems
        </span>
      </div>
    </div>
  );
};

export default MapPage;
