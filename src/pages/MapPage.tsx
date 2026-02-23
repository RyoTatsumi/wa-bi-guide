import React from 'react';
import { Navigation } from 'lucide-react';
import { useAppStore } from '../stores';
import { useTranslation } from '../i18n';
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
  const { t } = useTranslation();
  const subView = useAppStore((s) => s.subView);
  const selectedLocation = useAppStore((s) => s.selectedLocation);
  const setSelectedLocation = useAppStore((s) => s.setSelectedLocation);
  const navigateToLocation = useAppStore((s) => s.navigateToLocation);
  const { refreshPosition } = useGeolocation();

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

      {/* Area selector - top left, compact */}
      <div className="absolute top-3 left-3 z-[500]" style={{ maxWidth: 'calc(100% - 60px)' }}>
        <AreaSelector />
      </div>

      {/* Compass overlay - compact bar below area selector */}
      <CompassOverlay />

      {/* Location preview bottom sheet */}
      <LocationPreview
        location={selectedLocation}
        onClose={handleClose}
        onLearnMore={handleLearnMore}
      />

      {/* My location button - bottom right */}
      <button
        onClick={refreshPosition}
        className="absolute bottom-4 right-3 w-11 h-11 bg-white rounded-full shadow-lg flex items-center justify-center z-[400] border border-gray-100 active:scale-90 transition-transform"
      >
        <Navigation size={18} className="text-japan-blue" />
      </button>

      {/* Zoom hint */}
      <div className="absolute bottom-4 left-0 right-16 flex justify-center z-[300] pointer-events-none">
        <span className="text-xs text-zen-gray/70 bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full">
          {t('map.zoomHint')}
        </span>
      </div>
    </div>
  );
};

export default MapPage;
